import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';

import { getMonths, getYears, IMonth } from 'helpers';
import { useAppSelector, useErrorToast } from 'hooks';
import { useGetEmployeesQuery } from 'graphql/generated/schema';
import { selectThemeAccentColor } from 'features/theme/themeSlice';
import ProtectedTabTemplate from 'templates/ProtectedTabTemplate';

const SalariesTab = () => {
  const errorToast = useErrorToast();
  const { t } = useTranslation();

  const themeAccentColor = useAppSelector(selectThemeAccentColor);

  const bgColor = useColorModeValue('white', 'gray.800');
  const selectAccentText = useColorModeValue(`${themeAccentColor}.600`, `${themeAccentColor}.200`);

  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedMonth, setSelectedMonth] = useState<IMonth>();

  const { data: getEmployeesQueryData } = useGetEmployeesQuery({
    onError: (error) => {
      errorToast(error);
    },
  });

  const employeesData = getEmployeesQueryData?.employees?.data;
  const years = getYears();
  const months = getMonths();

  return (
    <ProtectedTabTemplate>
      <Flex
        wrap="wrap"
        gap={{
          base: 3,
          md: 4,
        }}
        direction={{
          base: 'column',
          md: 'row',
        }}
      >
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} color={selectedYear ? selectAccentText : undefined}>
            {selectedYear || t('selects.chooseYear')}
          </MenuButton>
          <MenuList maxH={60} overflow="hidden" overflowY="auto">
            <MenuOptionGroup type="radio">
              {years.map((year) => (
                <MenuItemOption key={year} value={`${year}`} onClick={() => setSelectedYear(year)}>
                  {year}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} color={selectedMonth ? selectAccentText : undefined}>
            {selectedMonth ? t(`months.${selectedMonth.name}`) : t('selects.chooseMonth')}
          </MenuButton>
          <MenuList maxH={60} overflow="hidden" overflowY="auto">
            <MenuOptionGroup type="radio">
              {months.map((month) => (
                <MenuItemOption key={month.name} value={month.name} onClick={() => setSelectedMonth(month)}>
                  {t(`months.${month.name}`)}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Flex>
      {employeesData ? (
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
                {employeesData.map(({ id, attributes }) => {
                  if (!id || !attributes) return null;

                  const { firstName, lastName } = attributes;
                  const workerName = lastName ? `${firstName} ${lastName}` : firstName;

                  return (
                    <Tr key={id}>
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
    </ProtectedTabTemplate>
  );
};

export default SalariesTab;
