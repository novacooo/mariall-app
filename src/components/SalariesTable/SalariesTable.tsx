import { Box, Spinner, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import NoItemsInformation from 'components/NoItemsInformation/NoItemsInformation';
import { useGetSalariesLazyQuery } from 'graphql/generated/schema';
import { useErrorToast } from 'hooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ISalary {
  employeeName: string;
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

  const fetchData = async () => {
    const getSalariesResponse = await getSalaries({ variables: { year, month } });
    const salariesData = getSalariesResponse.data?.salaries?.data;

    const newSalaries: ISalary[] = [];

    salariesData?.forEach(({ attributes: salaryAttributes }) => {
      const employeeAttributes = salaryAttributes?.employee?.data?.attributes;

      if (!salaryAttributes || !employeeAttributes) return;

      const { salary } = salaryAttributes;
      const { firstName, lastName } = employeeAttributes;

      const employeeName = lastName ? `${firstName} ${lastName}` : firstName;

      newSalaries.push({ employeeName, salary });
    });

    setSalaries(newSalaries);
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
              <Tr>
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
