import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useAppSelector } from 'hooks';
import { selectThemeAccentColor } from 'features/theme/themeSlice';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GetEmployeesQuery } from 'graphql/generated/schema';
import { monthNames } from 'constants/monthNames';
import { UserRole } from 'constants/UserRole';
import { selectUserRole } from 'features/user/userSlice';
import { getMonths, getYears, IMonth } from 'helpers';
import ButtonsWrapper from 'components/ButtonsWrapper/ButtonsWrapper';

export interface IWorker {
  id: string;
  name: string;
}

export interface IWorkerSelectsData {
  worker: IWorker;
  year: number;
  month: IMonth;
}

export interface WorkerSelectsHandle {
  resetSelects: () => void;
}

interface WorkerSelectsProps {
  getEmployeesQueryData: GetEmployeesQuery;
  disabled?: boolean;
  setWorkerSelectsData: (data: IWorkerSelectsData | undefined) => void;
}

const WorkerSelects = forwardRef<WorkerSelectsHandle, WorkerSelectsProps>(
  ({ getEmployeesQueryData, disabled, setWorkerSelectsData }, ref) => {
    const { t } = useTranslation();

    const userRole = useAppSelector(selectUserRole);
    const themeAccentColor = useAppSelector(selectThemeAccentColor);

    const selectAccentText = useColorModeValue(`${themeAccentColor}.600`, `${themeAccentColor}.200`);

    const [years, setYears] = useState<number[]>([]);
    const [months, setMonths] = useState<IMonth[]>([]);
    const [selectedWorker, setSelectedWorker] = useState<IWorker>();
    const [selectedYear, setSelectedYear] = useState<number>();
    const [selectedMonth, setSelectedMonth] = useState<IMonth>();

    const resetEverything = () => {
      setSelectedWorker(undefined);
      setSelectedYear(undefined);
      setSelectedMonth(undefined);
    };

    useImperativeHandle(ref, () => ({
      resetSelects: () => {
        resetEverything();
      },
    }));

    useEffect(() => {
      if (!selectedWorker) return;

      const date = new Date();
      const year = date.getFullYear();
      const monthIndex = date.getMonth(); // getMonth() function returns an integer number between 0 and 11
      const monthName = monthNames[monthIndex];
      const monthNumber = monthIndex + 1;

      if (userRole === UserRole.AUTHENTICATED || userRole === UserRole.ADMINISTRATOR) {
        const yearsToSet = getYears();
        const monthsToSet = getMonths();

        setYears(yearsToSet);
        setMonths(monthsToSet);

        return;
      }

      setYears([year]);
      setMonths([
        {
          number: monthNumber,
          name: monthName,
        },
      ]);
    }, [selectedWorker]);

    useEffect(() => {
      if (!selectedWorker || !selectedYear || !selectedMonth) {
        setWorkerSelectsData(undefined);
        return;
      }

      const workerSelectsData: IWorkerSelectsData = {
        worker: selectedWorker,
        year: selectedYear,
        month: selectedMonth,
      };

      setWorkerSelectsData(workerSelectsData);
    }, [selectedWorker, selectedYear, selectedMonth]);

    const employeesData = getEmployeesQueryData.employees?.data;

    if (!employeesData) return null;

    return (
      <ButtonsWrapper>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            color={selectedWorker ? selectAccentText : undefined}
            disabled={disabled}
          >
            {selectedWorker?.name || t('selects.chooseEmployee')}
          </MenuButton>
          <MenuList maxH={60} overflow="hidden" overflowY="auto">
            <MenuOptionGroup type="radio">
              {employeesData.map(({ id, attributes }) => {
                if (!id || !attributes) return null;

                const { firstName, lastName } = attributes;
                const workerName = lastName ? `${firstName} ${lastName}` : firstName;

                const worker: IWorker = { id, name: workerName };

                return (
                  <MenuItemOption key={id} value={id} onClick={() => setSelectedWorker(worker)}>
                    {workerName}
                  </MenuItemOption>
                );
              })}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        {selectedWorker && !!years.length && (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              color={selectedYear ? selectAccentText : undefined}
              disabled={disabled}
            >
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
        )}
        {selectedYear && months && (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              color={selectedMonth ? selectAccentText : undefined}
              disabled={disabled}
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
    );
  },
);

export default WorkerSelects;
