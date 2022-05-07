import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import AddingQuantityTable from 'components/AddingQuantityTable/AddingQuantityTable';
import { useColorContext } from 'contexts/ColorContext';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IWorkerData {
  id: string;
  name: string;
}

const workers: IWorkerData[] = [
  {
    id: 'worker-01',
    name: 'Jan Kowalski',
  },
  {
    id: 'worker-02',
    name: 'Jacek Nowak',
  },
  {
    id: 'worker-03',
    name: 'Krzysztof Bąkowski',
  },
];

const years: number[] = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];

const months: string[] = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

const getWorkers = (succed: boolean) => {
  return new Promise<IWorkerData[]>((resolve, reject) => {
    setTimeout(() => {
      if (!succed) reject(new Error('Failed to fetch workers data.'));
      resolve(workers);
    }, 300);
  });
};

const AddingQuantityTab = () => {
  const { t } = useTranslation();
  const { accentColor } = useColorContext();

  const selectAccentText = useColorModeValue(
    `${accentColor}.600`,
    `${accentColor}.200`,
  );

  const [workersData, setWorkersData] = useState<IWorkerData[]>();
  const [productsData, setProductsData] = useState();

  const [selectedWorker, setSelectedWorker] = useState<string>();
  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedMonth, setSelectedMonth] = useState<string>();

  useEffect(() => {
    const fetchWorkersData = async () => {
      try {
        const data = await getWorkers(true);
        setWorkersData(data);
      } catch (err) {
        console.error(`Error: ${err}`);
      }
    };

    fetchWorkersData();
  }, []);

  return (
    <Flex direction="column" gap={6}>
      {/* TODO: Make separated component for selects */}
      <Flex
        gap={{
          base: 3,
          md: 4,
        }}
        direction={{
          base: 'column',
          md: 'row',
        }}
      >
        {workersData ? (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              color={selectedWorker ? selectAccentText : undefined}
            >
              {selectedWorker || 'Wybierz pracownika'}
            </MenuButton>
            <MenuList maxH={60} overflow="hidden" overflowY="auto">
              <MenuOptionGroup type="radio">
                {workers.map(({ id, name }) => (
                  <MenuItemOption
                    key={id}
                    value={id}
                    onClick={() => setSelectedWorker(name)}
                  >
                    {name}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        ) : (
          <Spinner />
        )}
        {selectedWorker && (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              color={selectedYear ? selectAccentText : undefined}
            >
              {selectedYear || 'Wybierz rok'}
            </MenuButton>
            <MenuList maxH={60} overflow="hidden" overflowY="auto">
              <MenuOptionGroup type="radio">
                {years.map((year) => (
                  <MenuItemOption
                    key={year}
                    value={`${year}`}
                    onClick={() => setSelectedYear(year)}
                  >
                    {year}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        )}
        {selectedYear && (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              color={selectedMonth ? selectAccentText : undefined}
            >
              {selectedMonth ? t(`months.${selectedMonth}`) : 'Wybierz miesiąc'}
            </MenuButton>
            <MenuList maxH={60} overflow="hidden" overflowY="auto">
              <MenuOptionGroup type="radio">
                {months.map((month) => (
                  <MenuItemOption
                    key={month}
                    value={month}
                    onClick={() => setSelectedMonth(month)}
                  >
                    {t(`months.${month}`)}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        )}
      </Flex>
      {selectedMonth && <AddingQuantityTable />}
    </Flex>
  );
};

export default AddingQuantityTab;
