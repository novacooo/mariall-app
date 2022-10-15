import { Box, Flex, Spinner, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

import ProtectedTabTemplate from 'templates/ProtectedTabTemplate';
import { useGetEmployeesQuery } from 'graphql/generated/schema';
import { useErrorToast } from 'hooks';

const SalariesTab = () => {
  const errorToast = useErrorToast();

  const { data: getEmployeesData } = useGetEmployeesQuery({
    onError: (error) => {
      errorToast(error);
    },
  });

  const employeesData = getEmployeesData?.employees?.data;

  return (
    <ProtectedTabTemplate>
      <Flex direction="column" gap={6}>
        {employeesData ? (
          <Box w="full" overflowX="auto" bgColor="white" borderWidth={1} rounded="md">
            <TableContainer>
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>Pracownik</Th>
                    <Th isNumeric>Wypłata</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {employeesData.map(({ id, attributes }) => {
                    if (!id || !attributes) return null;

                    const { firstName, lastName } = attributes;
                    const workerName = lastName ? `${firstName} ${lastName}` : firstName;

                    return (
                      <Tr>
                        <Td>{workerName}</Td>
                        <Td isNumeric>1000,00 zł</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Spinner />
        )}
      </Flex>
    </ProtectedTabTemplate>
  );
};

export default SalariesTab;
