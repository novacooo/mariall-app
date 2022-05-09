import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Spinner,
  useColorModeValue,
  useDisclosure,
  Code,
  useToast,
} from '@chakra-ui/react';
import AddingQuantityTable, {
  AddingQuantityTableHandle,
  IQuantity,
} from 'components/AddingQuantityTable/AddingQuantityTable';
import { useColorContext } from 'contexts/ColorContext';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiSave, FiX } from 'react-icons/fi';

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
  const tableRef = useRef<AddingQuantityTableHandle>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const selectAccentText = useColorModeValue(
    `${accentColor}.600`,
    `${accentColor}.200`,
  );

  const [workersData, setWorkersData] = useState<IWorkerData[]>();
  const [quantities, setQuantities] = useState<IQuantity[]>([]);

  const [selectedWorker, setSelectedWorker] = useState<string>();
  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedMonth, setSelectedMonth] = useState<string>();

  const [isQuantitiesFetched, setIsQuantitiesFetched] =
    useState<boolean>(false);

  const toast = useToast();

  const handleSaveButtonClick = () => {
    if (!tableRef.current) return;

    setQuantities(tableRef.current.getQuantities());
    setIsQuantitiesFetched(true);
  };

  useEffect(() => {
    if (!isQuantitiesFetched) return;

    if (quantities.length > 0) {
      onOpen();
    } else {
      toast({
        title: t('toasts.titles.unableToSave'),
        description: t('toasts.descriptions.unableToSave'),
        duration: 5000,
        status: 'warning',
        isClosable: true,
        position: 'top',
      });
    }

    setIsQuantitiesFetched(false);
  }, [isQuantitiesFetched, onOpen, quantities.length, t, toast]);

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
        justify="space-between"
        gap={{
          base: 3,
          md: 4,
        }}
        direction={{
          base: 'column',
          md: 'row',
        }}
        wrap="wrap"
      >
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
          {workersData ? (
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                color={selectedWorker ? selectAccentText : undefined}
              >
                {selectedWorker || t('selects.chooseWorker')}
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
                {selectedYear || t('selects.chooseYear')}
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
                {selectedMonth
                  ? t(`months.${selectedMonth}`)
                  : t('selects.chooseMonth')}
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
        {selectedMonth && (
          <Button
            colorScheme={accentColor}
            onClick={handleSaveButtonClick}
            rightIcon={<FiSave />}
          >
            {t('buttons.saveChanges')}
          </Button>
        )}
      </Flex>
      {selectedWorker && selectedYear && selectedMonth && (
        <AddingQuantityTable
          workerId={selectedWorker}
          year={selectedYear}
          month={selectedMonth}
          ref={tableRef}
        />
      )}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              {t('alerts.headers.addingQuantities')}
            </AlertDialogHeader>
            <AlertDialogBody>
              {t('alerts.bodies.addingQuantities')}
              <Flex mt={3} direction="column" gap={1}>
                {quantities &&
                  quantities.map((el) => (
                    <Code
                      key={el.code}
                      children={`${el.code.toUpperCase()}: ${el.quantity}`}
                    />
                  ))}
              </Flex>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {t('buttons.cancel')}
              </Button>
              <Button
                colorScheme={accentColor}
                onClick={onClose}
                ml={3}
                rightIcon={<FiSave />}
              >
                {t('buttons.saveChanges')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default AddingQuantityTab;
