import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  useDisclosure,
  Code,
  Spinner,
} from '@chakra-ui/react';
import AddingQuantityTable, { AddingQuantityTableHandle } from 'components/AddingQuantityTable/AddingQuantityTable';
import { ISuccessToastPayload, useAppSelector, useAppToast, useErrorToast } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiRefreshCcw, FiSave } from 'react-icons/fi';
import {
  useCreateQuantityMutation,
  useDeleteQuantityMutation,
  useGetEmployeesQuery,
  useUpdateQuantityMutation,
} from 'graphql/generated/schema';
import { IQuantity } from 'components/AddingQuantityTableRow/AddingQuantityTableRow';
import { selectThemeAccentColor } from 'features/theme/themeSlice';
import { useDebouncedCallback } from 'use-debounce';
import WorkerSelects, { IWorkerSelectsData, WorkerSelectsHandle } from 'components/WorkerSelects/WorkerSelects';
import BetweenWrapper from 'components/BetweenWrapper/BetweenWrapper';
import ButtonsWrapper from 'components/ButtonsWrapper/ButtonsWrapper';

const AddingQuantityTab = () => {
  const { t } = useTranslation();
  const tableRef = useRef<AddingQuantityTableHandle>(null);
  const workerSelectsRef = useRef<WorkerSelectsHandle>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const themeAccentColor = useAppSelector(selectThemeAccentColor);

  const [workerSelectsData, setWorkerSelectsData] = useState<IWorkerSelectsData>();
  const [isAddedAnyQuantity, setIsAddedAnyQuantity] = useState<boolean>(false);
  const [quantities, setQuantities] = useState<IQuantity[]>([]);
  const [isQuantitiesFetched, setIsQuantitiesFetched] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);

  const appToast = useAppToast();
  const errorToast = useErrorToast();

  const debouncedAppToast = useDebouncedCallback(({ title, description }: ISuccessToastPayload) => {
    appToast({ title, description });
  }, 100);

  const resetEverything = () => {
    setIsAddedAnyQuantity(false);
    workerSelectsRef.current?.resetSelects();
  };

  const { data: getEmployeesQueryData } = useGetEmployeesQuery({
    onError: (error) => {
      errorToast(error);
    },
    onCompleted: () => {
      resetEverything();
    },
  });

  const [updateQuantity] = useUpdateQuantityMutation({
    onCompleted: () => {
      debouncedAppToast({
        title: t('toasts.titles.quantitiesAddSuccess'),
        description: t('toasts.descriptions.quantitiesAddSuccess'),
      });
    },
    onError: (error) => {
      errorToast(error);
    },
  });

  const [createQuantity] = useCreateQuantityMutation({
    onCompleted: () => {
      debouncedAppToast({
        title: t('toasts.titles.quantitiesAddSuccess'),
        description: t('toasts.descriptions.quantitiesAddSuccess'),
      });
    },
    onError: (error) => {
      errorToast(error);
    },
  });

  const [deleteQuantity] = useDeleteQuantityMutation({
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
    if (!workerSelectsData) return;

    const { worker, year, month: workerSelectsDataMonth } = workerSelectsData;

    const employeeId = worker.id;
    const month = workerSelectsDataMonth.number;

    const promises: ReturnType<typeof updateQuantity | typeof createQuantity>[] = [];

    setIsSending(true);

    quantities.forEach(({ productId, quantityId, quantity }) => {
      // Delete quantity if equals 0
      if (quantityId && quantity === 0) {
        promises.push(deleteQuantity({ variables: { quantityId } }));
        return;
      }

      // Update quantity if exist
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

      // Create if not exist
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
  };

  const handleDialogSaveButtonClick = () => {
    void sendQuantities();
  };

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
      <BetweenWrapper>
        {getEmployeesQueryData ? (
          <WorkerSelects
            ref={workerSelectsRef}
            getEmployeesQueryData={getEmployeesQueryData}
            disabled={isAddedAnyQuantity}
            setWorkerSelectsData={setWorkerSelectsData}
          />
        ) : (
          <Spinner />
        )}
        {workerSelectsData && (
          <ButtonsWrapper>
            <Button rightIcon={<FiRefreshCcw />} onClick={handleResetButtonClick}>
              {t('buttons.resetChanges')}
            </Button>
            <Button colorScheme={themeAccentColor} onClick={handleSaveButtonClick} rightIcon={<FiSave />}>
              {t('buttons.saveChanges')}
            </Button>
          </ButtonsWrapper>
        )}
      </BetweenWrapper>
      {workerSelectsData && (
        <AddingQuantityTable
          workerId={workerSelectsData.worker.id}
          year={workerSelectsData.year}
          month={workerSelectsData.month.number}
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
