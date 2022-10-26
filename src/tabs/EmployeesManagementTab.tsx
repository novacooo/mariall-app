import { useState } from 'react';
import { Button, Spinner, StackDivider, useDisclosure, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FiPlus } from 'react-icons/fi';

import { useAppSelector, useAppToast, useErrorToast } from 'hooks';
import { useDeleteEmployeeMutation, useGetEmployeesQuery } from 'graphql/generated/schema';
import NoItemsInformation from 'components/NoItemsInformation/NoItemsInformation';
import ProtectedTabTemplate from 'templates/ProtectedTabTemplate';
import EmployeeRow from 'components/EmployeeRow/EmployeeRow';
import EmployeeDrawer, { IDrawerEmployee } from 'components/EmployeeDrawer/EmployeeDrawer';
import DeleteEmployeeModal from 'components/DeleteEmployeeModal/DeleteEmployeeModal';
import { selectThemeAccentColor } from 'features/theme/themeSlice';
import AddEmployeeDrawer from 'components/AddEmployeeDrawer/AddEmployeeDrawer';
import { useLogger } from 'hooks/useLogger';
import { getErrorMessage } from 'helpers';

const EmployeesManagementTab = () => {
  const errorToast = useErrorToast();
  const appToast = useAppToast();
  const { t } = useTranslation();
  const logger = useLogger();

  const {
    isOpen: isAddEmployeeDrawerOpen,
    onOpen: onAddEmployeeDrawerOpen,
    onClose: onAddEmployeeDrawerClose,
  } = useDisclosure();
  const {
    isOpen: isEmployeeDrawerOpen,
    onOpen: onEmployeeDrawerOpen,
    onClose: onEmployeeDrawerClose,
  } = useDisclosure();

  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();

  const themeAccentColor = useAppSelector(selectThemeAccentColor);

  const [selectedEmployee, setSelectedEmployee] = useState<IDrawerEmployee>();
  const [isDeleting, setIsDeleting] = useState<boolean>();

  const { data: getEmployeesQueryData } = useGetEmployeesQuery({
    onCompleted: () => {
      logger.sendInfoLog(`Pobrano pracowników.`);
    },
    onError: (error) => {
      errorToast(error);
      logger.sendErrorLog(`Nie udało się pobrać pracowników. Error: ${getErrorMessage(error)}`);
    },
  });

  const [deleteEmployee] = useDeleteEmployeeMutation({
    onCompleted: (data) => {
      appToast({
        title: t('toasts.titles.deleteEmployeeSuccess'),
        description: t('toasts.descriptions.deleteEmployeeSuccess'),
      });
      logger.sendWarningLog(`Usunięto pracownika o ID: ${data.updateEmployee?.data?.id || ''}`);
    },
    onError: (error) => {
      errorToast(error);
      logger.sendErrorLog(`Nie udało się usunąć pracownika. Error: ${getErrorMessage(error)}`);
    },
  });

  const sendDeleteProduct = async () => {
    if (!selectedEmployee) return;

    setIsDeleting(true);

    await deleteEmployee({ variables: { employeeId: selectedEmployee.id } });

    setIsDeleting(false);

    onDeleteModalClose();
    onEmployeeDrawerClose();
  };

  const handleAddEmployeeDrawerOpen = () => {
    onAddEmployeeDrawerOpen();
  };

  const handleAddEmployeeDrawerClose = () => {
    onAddEmployeeDrawerClose();
  };

  const handleEmployeeDrawerOpen = (employee: IDrawerEmployee) => {
    setSelectedEmployee(employee);
    onEmployeeDrawerOpen();
  };

  const handleEmployeeDrawerClose = () => {
    setSelectedEmployee(undefined);
    onEmployeeDrawerClose();
  };

  const handleDeleteEmployeeModalOpen = (employee: IDrawerEmployee) => {
    setSelectedEmployee(employee);
    onDeleteModalOpen();
  };

  const handleDeleteEmployeeModalClose = () => {
    if (!isEmployeeDrawerOpen) setSelectedEmployee(undefined);
    onDeleteModalClose();
  };

  const handleModalDeleteButtonClick = () => {
    void sendDeleteProduct();
  };

  const employeesData = getEmployeesQueryData?.employees?.data;

  if (!employeesData) return <Spinner />;

  if (employeesData.length === 0) return <NoItemsInformation text={t('texts.noEmployees')} />;

  return (
    <ProtectedTabTemplate>
      <Button
        alignSelf={{ md: 'flex-end' }}
        colorScheme={themeAccentColor}
        rightIcon={<FiPlus />}
        onClick={handleAddEmployeeDrawerOpen}
      >
        {t('buttons.addEmployee')}
      </Button>
      <VStack align="stretch" divider={<StackDivider />}>
        {employeesData.map(({ id, attributes }) => {
          if (!id || !attributes) return null;

          const { firstName, lastName } = attributes;
          const employee: IDrawerEmployee = { id, firstName, lastName };

          return (
            <EmployeeRow
              key={id}
              employee={employee}
              onEditButtonClick={() => handleEmployeeDrawerOpen(employee)}
              onTrashButtonClick={() => handleDeleteEmployeeModalOpen(employee)}
            />
          );
        })}
      </VStack>
      <AddEmployeeDrawer isOpen={isAddEmployeeDrawerOpen} onClose={handleAddEmployeeDrawerClose} />
      <EmployeeDrawer
        employee={selectedEmployee}
        isOpen={isEmployeeDrawerOpen}
        onClose={handleEmployeeDrawerClose}
        onDeleteButtonClick={handleDeleteEmployeeModalOpen}
      />
      <DeleteEmployeeModal
        isOpen={isDeleteModalOpen}
        isLoading={isDeleting}
        onClose={handleDeleteEmployeeModalClose}
        onDeleteButtonClick={handleModalDeleteButtonClick}
      />
    </ProtectedTabTemplate>
  );
};

export default EmployeesManagementTab;
