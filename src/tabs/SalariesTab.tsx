import { useEffect, useRef, useState } from 'react';
import { Box, Flex, Spinner, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

import ProtectedTabTemplate from 'templates/ProtectedTabTemplate';
import { useGetEmployeesQuery } from 'graphql/generated/schema';
import { useErrorToast } from 'hooks';
import WorkerSelects, { IWorkerSelectsData, WorkerSelectsHandle } from 'components/WorkerSelects/WorkerSelects';

const SalariesTab = () => {
  const errorToast = useErrorToast();
  const workerSelectsRef = useRef<WorkerSelectsHandle>(null);

  const [workerSelectsData, setWorkerSelectsData] = useState<IWorkerSelectsData>();

  const { data: getEmployeesQueryData } = useGetEmployeesQuery({
    onError: (error) => {
      errorToast(error);
    },
  });

  useEffect(() => {
    console.log(workerSelectsData);
  }, [workerSelectsData]);

  return (
    <ProtectedTabTemplate>
      <Flex direction="column" gap={6}>
        {getEmployeesQueryData ? (
          <WorkerSelects
            ref={workerSelectsRef}
            getEmployeesQueryData={getEmployeesQueryData}
            setWorkerSelectsData={setWorkerSelectsData}
          />
        ) : (
          <Spinner />
        )}
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
                <Tr>
                  <Td>Jacek Nowak</Td>
                  <Td isNumeric>1000,00 zł</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </ProtectedTabTemplate>
  );
};

export default SalariesTab;
