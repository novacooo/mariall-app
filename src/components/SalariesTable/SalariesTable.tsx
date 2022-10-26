import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Box, Spinner, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { checkIsActualMonth, getEmployeeName, getErrorMessage } from 'helpers';
import { useErrorToast } from 'hooks';
import {
  useCreateSalaryMutation,
  useDeleteSalaryMutation,
  useGetEmployeesWithQuantitiesLazyQuery,
  useGetSalariesLazyQuery,
  useUpdateSalaryMutation,
} from 'graphql/generated/schema';
import NoItemsInformation from 'components/NoItemsInformation/NoItemsInformation';
import { useLogger } from 'hooks/useLogger';

interface ISalary {
  employeeId: string;
  employeeName: string;
  salaryId?: string;
  salary: number;
}

export interface SalariesTableHandle {
  recalculateSalaries: () => Promise<void>;
}

interface SalariesTableProps {
  year: number;
  month: number;
}

const SalariesTable = forwardRef<SalariesTableHandle, SalariesTableProps>(({ year, month }, ref) => {
  const errorToast = useErrorToast();
  const { t } = useTranslation();
  const logger = useLogger();

  const bgColor = useColorModeValue('white', 'gray.800');

  const [salaries, setSalaries] = useState<ISalary[]>();

  const [getSalaries] = useGetSalariesLazyQuery({
    onError: (error) => {
      errorToast(error);
      logger.sendErrorLog(`Nie udało się pobrać wypłat. Error: ${getErrorMessage(error)}`);
    },
  });

  const [getEmployeesWithQuantities] = useGetEmployeesWithQuantitiesLazyQuery({
    onError: (error) => {
      errorToast(error);
      logger.sendErrorLog(`Nie udało się pobrać pracowników. Error: ${getErrorMessage(error)}`);
    },
  });

  const [updateSalary] = useUpdateSalaryMutation({
    onError: (error) => {
      errorToast(error);
      logger.sendErrorLog(`Nie udało się zaktualizować wypłaty. Error: ${getErrorMessage(error)}`);
    },
  });

  const [createSalary] = useCreateSalaryMutation({
    onError: (error) => {
      errorToast(error);
      logger.sendErrorLog(`Nie udało się utworzyć wypłaty. Error: ${getErrorMessage(error)}`);
    },
  });

  const [deleteSalary] = useDeleteSalaryMutation({
    onError: (error) => {
      errorToast(error);
      logger.sendErrorLog(`Nie udało się usunąć wypłaty. Error: ${getErrorMessage(error)}`);
    },
  });

  const calculateSalaries = async () => {
    const getSalariesResponse = await getSalaries({ variables: { year, month } });
    const salariesData = getSalariesResponse.data?.salaries?.data;

    const getEmployeesWithQuantitiesResponse = await getEmployeesWithQuantities({ variables: { year, month } });
    const employeesWithQuantitiesData = getEmployeesWithQuantitiesResponse.data?.employees?.data;

    const salariesToSet: ISalary[] = [];
    const salariesToDelete: string[] = [];

    const promises: ReturnType<typeof updateSalary | typeof createSalary>[] = [];

    // Calculate salaries
    employeesWithQuantitiesData?.forEach(({ id: employeeId, attributes: employeeAttributes }) => {
      if (!employeeId || !employeeAttributes) return;

      const { firstName, lastName } = employeeAttributes;
      const quantitiesData = employeeAttributes.quantities?.data;

      if (!quantitiesData || quantitiesData.length === 0) return;

      const employeeName = getEmployeeName(firstName, lastName);
      let salary = 0;

      quantitiesData.forEach(({ attributes: quantityAttributes }) => {
        const productPrice = quantityAttributes?.product?.data?.attributes?.price;
        if (!quantityAttributes || !productPrice) return;

        const quantity = quantityAttributes?.quantity;
        salary += quantity * productPrice;
      });

      salary = Number(salary.toFixed(2));

      salariesToSet.push({ employeeId, employeeName, salary });
    });

    // If salary exist set salary id
    salariesData?.forEach(({ id: salaryId, attributes: salaryAttributes }) => {
      const employeeId = salaryAttributes?.employee?.data?.id;
      if (!salaryId || !salaryAttributes || !employeeId) return;

      const foundIndex = salariesToSet.findIndex((salary) => salary.employeeId === employeeId);

      // If salary no longer exist add it to delete queue
      if (foundIndex === -1) {
        salariesToDelete.push(salaryId);
        return;
      }

      salariesToSet[foundIndex] = { ...salariesToSet[foundIndex], salaryId };
    });

    // Update or create salaries
    salariesToSet.forEach(({ employeeId, salaryId, salary }) => {
      if (salaryId) {
        promises.push(updateSalary({ variables: { salaryId, salary } }));
        return;
      }

      promises.push(createSalary({ variables: { employeeId, year, month, salary } }));
    });

    // Delete salaries
    salariesToDelete.forEach((salaryId) => {
      promises.push(deleteSalary({ variables: { salaryId } }));
    });

    await Promise.all(promises);

    setSalaries(salariesToSet);
  };

  const fetchData = async () => {
    if (checkIsActualMonth(year, month)) {
      await calculateSalaries();
      return;
    }

    const getSalariesResponse = await getSalaries({ variables: { year, month } });
    const salariesData = getSalariesResponse.data?.salaries?.data;

    const salariesToSet: ISalary[] = [];

    salariesData?.forEach(({ attributes: salaryAttributes }) => {
      const employeeId = salaryAttributes?.employee?.data?.id;
      const employeeAttributes = salaryAttributes?.employee?.data?.attributes;

      if (!salaryAttributes || !employeeId || !employeeAttributes) return;

      const { salary } = salaryAttributes;
      const { firstName, lastName } = employeeAttributes;

      const employeeName = getEmployeeName(firstName, lastName);

      salariesToSet.push({ employeeId, employeeName, salary });
    });

    setSalaries(salariesToSet);
  };

  useImperativeHandle(ref, () => ({
    recalculateSalaries: calculateSalaries,
  }));

  useEffect(() => {
    void fetchData();
  }, [year, month]);

  if (!salaries) return <Spinner />;

  if (salaries.length === 0) return <NoItemsInformation text={t('texts.noSalaries')} />;

  return (
    <Box w="full" overflowX="auto" bgColor={bgColor} borderWidth={1} rounded="md">
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>{t('tables.salariesEmployee')}</Th>
              <Th isNumeric>{t('tables.salariesSalary')}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {salaries.map(({ employeeId, employeeName, salary }) => (
              <Tr key={`${employeeId}-${employeeName}-${salary}`}>
                <Td>{employeeName}</Td>
                <Td isNumeric>{`${salary} ${t('texts.currency')}`}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
});

export default SalariesTable;
