import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiRefreshCcw } from 'react-icons/fi';

import { checkIsActualMonth, getMonths, getYears, IMonth } from 'helpers';
import { useAppSelector } from 'hooks';
import { selectThemeAccentColor } from 'features/theme/themeSlice';
import ProtectedTabTemplate from 'templates/ProtectedTabTemplate';
import SalariesTable, { SalariesTableHandle } from 'components/SalariesTable/SalariesTable';
import ButtonsWrapper from 'components/ButtonsWrapper/ButtonsWrapper';
import BetweenWrapper from 'components/BetweenWrapper/BetweenWrapper';

const SalariesTab = () => {
  const { t } = useTranslation();

  const themeAccentColor = useAppSelector(selectThemeAccentColor);

  const selectAccentText = useColorModeValue(`${themeAccentColor}.600`, `${themeAccentColor}.200`);

  const salariesTableRef = useRef<SalariesTableHandle>(null);

  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedMonth, setSelectedMonth] = useState<IMonth>();
  const [isRecalculating, setIsRecalculating] = useState<boolean>(false);

  const years = getYears();
  const months = getMonths();

  const recalculate = async () => {
    if (!salariesTableRef.current) return;

    setIsRecalculating(true);
    await salariesTableRef.current.recalculateSalaries();
    setIsRecalculating(false);
  };

  const handleRecalculateButtonClick = () => {
    void recalculate();
  };

  return (
    <ProtectedTabTemplate>
      <BetweenWrapper>
        <ButtonsWrapper>
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
        </ButtonsWrapper>
        {selectedYear && selectedMonth && !checkIsActualMonth(selectedYear, selectedMonth.number) && (
          <Button
            rightIcon={<FiRefreshCcw />}
            onClick={handleRecalculateButtonClick}
            isLoading={isRecalculating}
            loadingText={t('loading.recalculating')}
          >
            {t('buttons.recalculateSalaries')}
          </Button>
        )}
      </BetweenWrapper>
      {selectedYear && selectedMonth && (
        <SalariesTable ref={salariesTableRef} year={selectedYear} month={selectedMonth.number} />
      )}
    </ProtectedTabTemplate>
  );
};

export default SalariesTab;
