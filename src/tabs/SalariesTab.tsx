import { Box, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';

import ProtectedTabTemplate from 'templates/ProtectedTabTemplate';

const SalariesTab = () => {
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <ProtectedTabTemplate>
      <Flex direction="column" gap={6}>
        <Box w="full" overflowX="auto" bgColor={bgColor} borderWidth={1} rounded="md">
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
