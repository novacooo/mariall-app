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
} from '@chakra-ui/react';
import AddingQuantityTable, { AddingQuantityTableHandle } from 'components/AddingQuantityTable/AddingQuantityTable';
import { useAppSelector, useAppToast, useErrorToast } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiRefreshCcw, FiSave } from 'react-icons/fi';
import { useCreateQuantityMutation, useGetEmployeesQuery, useUpdateQuantityMutation } from 'graphql/generated/schema';
import { IQuantity } from 'components/AddingQuantityTableRow/AddingQuantityTableRow';
import { monthNames } from 'constants/monthNames';
import { selectUserRole } from 'features/user/userSlice';
import { UserRole } from 'constants/UserRole';
import { selectThemeAccentColor } from 'features/theme/themeSlice';

interface IMonth {
  number: number;
  name: string;
}

interface IWorker {
  id: string;
  name: string;
}

const AddingQuantityTab = () => {
  const { t } = useTranslation();
  const tableRef = useRef<AddingQuantityTableHandle>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const userRole = useAppSelector(selectUserRole);
  const themeAccentColor = useAppSelector(selectThemeAccentColor);

  const selectAccentText = useColorModeValue(`${themeAccentColor}.600`, `${themeAccentColor}.200`);

  const [years, setYears] = useState<number[]>([]);
  const [months, setMonths] = useState<IMonth[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<IWorker>();
  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedMonth, setSelectedMonth] = useState<IMonth>();
  const [isAddedAnyQuantity, setIsAddedAnyQuantity] = useState<boolean>(false);
  const [quantities, setQuantities] = useState<IQuantity[]>([]);
  const [isQuantitiesFetched, setIsQuantitiesFetched] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);

  const appToast = useAppToast();
  const errorToast = useErrorToast();

  const resetEverything = () => {
    setIsAddedAnyQuantity(false);
    setSelectedWorker(undefined);
    setSelectedYear(undefined);
    setSelectedMonth(undefined);
  };

  const { data: getEmployeesData } = useGetEmployeesQuery({
    onError: (error) => {
      errorToast(error);
    },
    onCompleted: () => {
      resetEverything();
    },
  });

  const employeesData = getEmployeesData?.employees?.data;

  const [updateQuantity] = useUpdateQuantityMutation({
    onError: (error) => {
      errorToast(error);
    },
  });

  const [createQuantity] = useCreateQuantityMutation({
    onError: (error) => {
      errorToast(error);
    },
  });

  const handleResetButtonClick = () => {
    if (!tableRef.current) return;

    tableRef.current.resetQuantities();
  };

  const handleSaveButtonClick = () => {
    if (!tableRef.current) return;

    setQuantities(tableRef.current.getQuantities());
    setIsQuantitiesFetched(true);
  };

  const sendQuantities = async () => {
    if (quantities.length === 0) return;
    if (!selectedWorker || !selectedYear || !selectedMonth) return;

    const employeeId = selectedWorker.id;
    const year = selectedYear;
    const month = selectedMonth.number;

    const promises: ReturnType<typeof updateQuantity | typeof createQuantity>[] = [];

    setIsSending(true);

    quantities.forEach(({ productId, quantityId, quantity }) => {
      if (quantityId) {
        promises.push(
          updateQuantity({
            variables: {
              quantity,
              id: quantityId,
            },
          }),
        );

        return;
      }

      promises.push(
        createQuantity({
          variables: {
            employeeId,
            year,
            month,
            productId,
            quantity,
          },
        }),
      );
    });

    await Promise.all(promises);

    setIsSending(false);
    onClose();
    resetEverything();

    appToast({
      title: t('toasts.titles.quantitiesAddSuccess'),
      description: t('toasts.descriptions.quantitiesAddSuccess'),
    });
  };

  const handleDialogSaveButtonClick = () => {
    void sendQuantities();
  };

  useEffect(() => {
    if (!selectedWorker) return;

    const date = new Date();
    const year = date.getFullYear();
    const monthIndex = date.getMonth(); // getMonth() function returns an integer number between 0 and 11
    const monthName = monthNames[monthIndex];
    const monthNumber = monthIndex + 1;

    if (userRole === UserRole.AUTHENTICATED || userRole === UserRole.ADMINISTRATOR) {
      const range = 2;
      const startYear = year - range;
      const endYear = year + range;

      const yearsToSet: number[] = [];
      const monthsToSet: IMonth[] = [];

      for (let i = startYear; i < endYear; i += 1) {
        yearsToSet.push(i);
      }

      for (let i = 0; i < 12; i += 1) {
        monthsToSet.push({
          number: i + 1,
          name: monthNames[i],
        });
      }

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
    if (!isQuantitiesFetched) return;

    if (quantities.length > 0) {
      onOpen();
    } else {
      appToast({
        title: t('toasts.titles.unableToSave'),
        description: t('toasts.descriptions.unableToSave'),
        status: 'warning',
      });
    }

    setIsQuantitiesFetched(false);
  }, [isQuantitiesFetched]);

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
                disabled={isAddedAnyQuantity}
              >
                {selectedWorker?.name || t('selects.chooseWorker')}
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
                  disabled={isAddedAnyQuantity}
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
                  disabled={isAddedAnyQuantity}
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
            <Button colorScheme={themeAccentColor} onClick={handleSaveButtonClick} rightIcon={<FiSave />}>
              {t('buttons.saveChanges')}
            </Button>
          </Flex>
        )}
      </Flex>
      {selectedWorker && selectedYear && selectedMonth && (
        <AddingQuantityTable
          workerId={selectedWorker.id}
          year={selectedYear}
          month={selectedMonth.number}
          setIsAddedAnyQuantity={setIsAddedAnyQuantity}
          ref={tableRef}
        />
      )}
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>{t('alerts.headers.addingQuantities')}</AlertDialogHeader>
            <AlertDialogBody>
              {t('alerts.bodies.addingQuantities')}
              <Flex mt={3} direction="column" gap={1}>
                {quantities &&
                  quantities.map(({ productCode, count }) => (
                    <Code key={productCode}>{`${productCode.toUpperCase()}: ${count}`}</Code>
                  ))}
              </Flex>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {t('buttons.cancel')}
              </Button>
              <Button
                colorScheme={themeAccentColor}
                onClick={handleDialogSaveButtonClick}
                ml={3}
                rightIcon={<FiSave />}
                isLoading={isSending}
                loadingText={t('loading.saving')}
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
