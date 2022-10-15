import ProtectedTabTemplate from 'templates/ProtectedTabTemplate';
import { Box, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const SalariesTab = () => (
  <ProtectedTabTemplate>
    <Flex direction="column" gap={6}>
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
                <Td isNumeric>5434,33 zł</Td>
              </Tr>
              <Tr>
                <Td>Krzysztof Nowak</Td>
                <Td isNumeric>8546,99 zł</Td>
              </Tr>
              <Tr>
                <Td>Justyna Nowak</Td>
                <Td isNumeric>2534,32 zł</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  </ProtectedTabTemplate>
);

export default SalariesTab;
