import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  useColorModeValue,
} from '@chakra-ui/react';

import { getMonths, getYears, IMonth } from 'helpers';
import { useAppSelector } from 'hooks';
import { selectThemeAccentColor } from 'features/theme/themeSlice';
import ProtectedTabTemplate from 'templates/ProtectedTabTemplate';
import SalariesTable from 'components/SalariesTable/SalariesTable';

const SalariesTab = () => {
  const { t } = useTranslation();

  const themeAccentColor = useAppSelector(selectThemeAccentColor);

  const selectAccentText = useColorModeValue(`${themeAccentColor}.600`, `${themeAccentColor}.200`);

  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedMonth, setSelectedMonth] = useState<IMonth>();

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
        {selectedYear && (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              color={selectedMonth ? selectAccentText : undefined}
            >
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
        )}
      </Flex>
      {selectedYear && selectedMonth && <SalariesTable year={selectedYear} month={selectedMonth.number} />}
    </ProtectedTabTemplate>
  );
};

export default SalariesTab;
