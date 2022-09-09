import { useQuery } from '@apollo/client';
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
import { getEmployeesQuery, GetEmployeesQueryPayload } from 'graphql/queries';
import { useErrorToast } from 'hooks/useErrorToast';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiRefreshCcw, FiSave } from 'react-icons/fi';

interface IWorkerData {
  id: number;
  firstName: string;
  lastName?: string;
}

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

const AddingQuantityTab = () => {
  const { t } = useTranslation();
  const { accentColor } = useColorContext();
  const tableRef = useRef<AddingQuantityTableHandle>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const selectAccentText = useColorModeValue(`${accentColor}.600`, `${accentColor}.200`);

  const [workersData, setWorkersData] = useState<IWorkerData[]>();
  const [quantities, setQuantities] = useState<IQuantity[]>([]);

  const [selectedWorker, setSelectedWorker] = useState<string>();
  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedMonth, setSelectedMonth] = useState<string>();

  const [isQuantitiesFetched, setIsQuantitiesFetched] = useState<boolean>(false);

  const toast = useToast();
  const errorToast = useErrorToast();

  const handleResetButtonClick = () => {
    if (!tableRef.current) return;
    tableRef.current.resetQuantities();
  };

  const handleSaveButtonClick = () => {
    if (!tableRef.current) return;
    setQuantities(tableRef.current.getQuantities());
    setIsQuantitiesFetched(true);
  };

  useQuery<GetEmployeesQueryPayload>(getEmployeesQuery, {
    onError: (error) => {
      errorToast(error);
    },
    onCompleted: ({ employees }) => {
      const newWorkersData: IWorkerData[] = [];

      employees.data.forEach((worker) => {
        const {
          id,
          attributes: { firstName, lastName },
        } = worker;

        newWorkersData.push({
          id,
          firstName,
          lastName,
        });
      });

      setWorkersData(newWorkersData);
    },
  });

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
                  {workersData.map(({ id, firstName, lastName }) => {
                    const name = lastName ? `${firstName} ${lastName}` : firstName;

                    return (
                      <MenuItemOption key={id} value={id.toString()} onClick={() => setSelectedWorker(name)}>
                        {name}
                      </MenuItemOption>
                    );
                  })}
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
                    <MenuItemOption key={year} value={`${year}`} onClick={() => setSelectedYear(year)}>
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
                {selectedMonth ? t(`months.${selectedMonth}`) : t('selects.chooseMonth')}
              </MenuButton>
              <MenuList maxH={60} overflow="hidden" overflowY="auto">
                <MenuOptionGroup type="radio">
                  {months.map((month) => (
                    <MenuItemOption key={month} value={month} onClick={() => setSelectedMonth(month)}>
                      {t(`months.${month}`)}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          )}
        </Flex>
        {selectedMonth && (
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
            <Button rightIcon={<FiRefreshCcw />} onClick={handleResetButtonClick}>
              {t('buttons.resetChanges')}
            </Button>
            <Button colorScheme={accentColor} onClick={handleSaveButtonClick} rightIcon={<FiSave />}>
              {t('buttons.saveChanges')}
            </Button>
          </Flex>
        )}
      </Flex>
      {selectedWorker && selectedYear && selectedMonth && (
        <AddingQuantityTable workerId={selectedWorker} year={selectedYear} month={selectedMonth} ref={tableRef} />
      )}
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>{t('alerts.headers.addingQuantities')}</AlertDialogHeader>
            <AlertDialogBody>
              {t('alerts.bodies.addingQuantities')}
              <Flex mt={3} direction="column" gap={1}>
                {quantities &&
                  quantities.map((el) => <Code key={el.code}>{`${el.code.toUpperCase()}: ${el.quantity}`}</Code>)}
              </Flex>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {t('buttons.cancel')}
              </Button>
              <Button colorScheme={accentColor} onClick={onClose} ml={3} rightIcon={<FiSave />}>
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
