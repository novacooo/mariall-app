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
  useToast,
} from '@chakra-ui/react';
import { useColorContext } from 'contexts/ColorContext';
import { useEffect, useState } from 'react';

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

const months: string[] = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
];

const years: number[] = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];

const getWorkers = (succed: boolean) => {
  return new Promise<IWorkerData[]>((resolve, reject) => {
    setTimeout(() => {
      if (!succed) reject(new Error('Failed to fetch workers data.'));
      resolve(workers);
    }, 1000);
  });
};

const AddingQuantityTab = () => {
  const { accentColor } = useColorContext();

  const [workersData, setWorkersData] = useState<IWorkerData[]>();
  const [productsData, setProductsData] = useState();

  const [selectedWorker, setSelectedWorker] = useState<string>();
  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedMonth, setSelectedMonth] = useState<string>();

  const toast = useToast();

  const fetchWorkersData = async () => {
    try {
      const data = await getWorkers(true);
      setWorkersData(data);
    } catch (err) {
      toast({
        title: 'An error occured',
        description: `${err}`,
        status: 'error',
        position: 'top',
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchWorkersData();
  });

  return (
    <Flex direction="column">
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
              variant="outline"
              rightIcon={<ChevronDownIcon />}
              colorScheme={selectedWorker ? accentColor : undefined}
            >
              {selectedWorker || 'Wybierz pracownika'}
            </MenuButton>
            <MenuList maxH={60} overflow="hidden" overflowY="auto">
              <MenuOptionGroup defaultValue={workers[0].id} type="radio">
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
              variant="outline"
              rightIcon={<ChevronDownIcon />}
              colorScheme={selectedYear ? accentColor : undefined}
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
              variant="outline"
              rightIcon={<ChevronDownIcon />}
              colorScheme={selectedMonth ? accentColor : undefined}
            >
              {selectedMonth || 'Wybierz miesiąc'}
            </MenuButton>
            <MenuList maxH={60} overflow="hidden" overflowY="auto">
              <MenuOptionGroup type="radio">
                {months.map((month) => (
                  <MenuItemOption
                    key={month}
                    value={`${month}`}
                    onClick={() => setSelectedMonth(month)}
                  >
                    {month}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        )}
      </Flex>
      {selectedMonth && <>{productsData ? <p>data here</p> : <p>fds</p>}</>}
    </Flex>
  );
};

export default AddingQuantityTab;
