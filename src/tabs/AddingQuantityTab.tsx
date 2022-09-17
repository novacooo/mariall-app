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
import { useErrorToast } from 'hooks/useErrorToast';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiRefreshCcw, FiSave } from 'react-icons/fi';
import { useGetEmployeesQuery } from 'graphql/generated/schema';

interface IMonth {
  id: number;
  name: string;
}

interface IWorker {
  id: string;
  name: string;
}

const years: number[] = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];

const months: IMonth[] = [
  {
    id: 1,
    name: 'january',
  },
  {
    id: 2,
    name: 'february',
  },
  {
    id: 3,
    name: 'march',
  },
  {
    id: 4,
    name: 'april',
  },
  {
    id: 5,
    name: 'may',
  },
  {
    id: 6,
    name: 'june',
  },
  {
    id: 7,
    name: 'july',
  },
  {
    id: 8,
    name: 'august',
  },
  {
    id: 9,
    name: 'september',
  },
  {
    id: 10,
    name: 'october',
  },
  {
    id: 11,
    name: 'november',
  },
  {
    id: 12,
    name: 'december',
  },
];

const AddingQuantityTab = () => {
  const { t } = useTranslation();
  const { accentColor } = useColorContext();
  const tableRef = useRef<AddingQuantityTableHandle>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const selectAccentText = useColorModeValue(`${accentColor}.600`, `${accentColor}.200`);

  const [quantities, setQuantities] = useState<IQuantity[]>([]);

  const [selectedWorker, setSelectedWorker] = useState<IWorker>();
  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedMonth, setSelectedMonth] = useState<IMonth>();

  const [isQuantitiesFetched, setIsQuantitiesFetched] = useState<boolean>(false);

  const toast = useToast();
  const errorToast = useErrorToast();

  const { data: getEmployeesData } = useGetEmployeesQuery({
    onError: (error) => {
      errorToast(error);
    },
    onCompleted: () => {
      setSelectedWorker(undefined);
      setSelectedYear(undefined);
      setSelectedMonth(undefined);
    },
  });

  const employeesData = getEmployeesData?.employees?.data;

  const handleResetButtonClick = () => {
    if (!tableRef.current) return;
    tableRef.current.resetQuantities();
  };

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

  return (
    <Flex direction="column" gap={6}>
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
        {employeesData ? (
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
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                color={selectedWorker ? selectAccentText : undefined}
              >
                {selectedWorker?.name || t('selects.chooseWorker')}
              </MenuButton>
              <MenuList maxH={60} overflow="hidden" overflowY="auto">
                <MenuOptionGroup type="radio">
                  {employeesData.map(({ id, attributes }) => {
                    if (!id || !attributes) return null;

                    const { firstName, lastName } = attributes;
                    const workerName = lastName ? `${firstName} ${lastName}` : firstName;

                    const worker: IWorker = {
                      id,
                      name: workerName,
                    };

                    return (
                      <MenuItemOption key={id} value={id} onClick={() => setSelectedWorker(worker)}>
                        {workerName}
                      </MenuItemOption>
                    );
                  })}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
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
        ) : (
          <Spinner />
        )}
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
        <AddingQuantityTable workerId={selectedWorker.id} year={selectedYear} month={selectedMonth.id} ref={tableRef} />
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
