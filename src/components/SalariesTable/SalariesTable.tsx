import { useEffect, useState } from 'react';
import { Box, Spinner, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { checkIsActualMonth } from 'helpers';
import { useErrorToast } from 'hooks';
import {
  useCreateSalaryMutation,
  useGetEmployeesWithQuantitiesLazyQuery,
  useGetSalariesLazyQuery,
  useUpdateSalaryMutation,
} from 'graphql/generated/schema';
import NoItemsInformation from 'components/NoItemsInformation/NoItemsInformation';

interface ISalary {
  employeeId?: string;
  employeeName: string;
  salaryId?: string;
  salary: number;
}

interface SalariesTableProps {
  year: number;
  month: number;
}

const SalariesTable = ({ year, month }: SalariesTableProps) => {
  const errorToast = useErrorToast();
  const { t } = useTranslation();

  const bgColor = useColorModeValue('white', 'gray.800');

  const [salaries, setSalaries] = useState<ISalary[]>();

  const [getSalaries] = useGetSalariesLazyQuery({
    onError: (error) => {
      errorToast(error);
    },
  });

  const [getEmployeesWithQuantities] = useGetEmployeesWithQuantitiesLazyQuery({
    onError: (error) => {
      errorToast(error);
    },
  });

  const [updateSalary] = useUpdateSalaryMutation({
    onError: (error) => {
      errorToast(error);
    },
  });

  const [createSalary] = useCreateSalaryMutation({
    onError: (error) => {
      errorToast(error);
    },
  });

  const fetchData = async () => {
    const getSalariesResponse = await getSalaries({ variables: { year, month } });
    const salariesData = getSalariesResponse.data?.salaries?.data;

    const salariesToSet: ISalary[] = [];

    if (checkIsActualMonth(year, month)) {
      const getEmployeesWithQuantitiesResponse = await getEmployeesWithQuantities({ variables: { year, month } });
      const employeesWithQuantitiesData = getEmployeesWithQuantitiesResponse.data?.employees?.data;

      const promises: ReturnType<typeof updateSalary | typeof createSalary>[] = [];

      employeesWithQuantitiesData?.forEach(({ id: employeeId, attributes: employeeAttributes }) => {
        if (!employeeId || !employeeAttributes) return;

        const { firstName, lastName } = employeeAttributes;
        const quantitiesData = employeeAttributes.quantities?.data;

        if (!quantitiesData || quantitiesData.length === 0) return;

        const employeeName = lastName ? `${firstName} ${lastName}` : firstName;
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

      salariesData?.forEach(({ id: salaryId, attributes: salaryAttributes }) => {
        const employeeId = salaryAttributes?.employee?.data?.id;
        if (!salaryId || !salaryAttributes || !employeeId) return;
        const foundIndex = salariesToSet.findIndex((salary) => salary.employeeId === employeeId);
        if (foundIndex === -1) return;
        salariesToSet[foundIndex] = { ...salariesToSet[foundIndex], salaryId };
      });

      salariesToSet.forEach(({ employeeId, salaryId, salary }) => {
        if (!employeeId) return;

        if (salaryId) {
          promises.push(updateSalary({ variables: { salaryId, salary } }));
          return;
        }

        promises.push(createSalary({ variables: { employeeId, year, month, salary } }));
      });

      await Promise.all(promises);

      setSalaries(salariesToSet);
      return;
    }

    salariesData?.forEach(({ attributes: salaryAttributes }) => {
      const employeeAttributes = salaryAttributes?.employee?.data?.attributes;

      if (!salaryAttributes || !employeeAttributes) return;

      const { salary } = salaryAttributes;
      const { firstName, lastName } = employeeAttributes;

      const employeeName = lastName ? `${firstName} ${lastName}` : firstName;

      salariesToSet.push({ employeeName, salary });
    });

    setSalaries(salariesToSet);
  };

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
            {salaries.map(({ employeeName, salary }) => (
              <Tr key={`${employeeName}-${salary}`}>
                <Td>{employeeName}</Td>
                <Td isNumeric>{`${salary} ${t('texts.currency')}`}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SalariesTable;
