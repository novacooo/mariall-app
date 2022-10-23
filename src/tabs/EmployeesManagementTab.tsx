import { useState } from 'react';
import { Spinner, StackDivider, useDisclosure, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useAppToast, useErrorToast } from 'hooks';
import { useDeleteEmployeeMutation, useGetEmployeesQuery } from 'graphql/generated/schema';
import NoItemsInformation from 'components/NoItemsInformation/NoItemsInformation';
import ProtectedTabTemplate from 'templates/ProtectedTabTemplate';
import EmployeeRow from 'components/EmployeeRow/EmployeeRow';
import EmployeeDrawer, { IDrawerEmployee } from 'components/EmployeeDrawer/EmployeeDrawer';
import DeleteEmployeeModal from 'components/DeleteEmployeeModal/DeleteEmployeeModal';

const EmployeesManagementTab = () => {
  const errorToast = useErrorToast();
  const appToast = useAppToast();
  const { t } = useTranslation();

  const {
    isOpen: isEmployeeDrawerOpen,
    onOpen: onEmployeeDrawerOpen,
    onClose: onEmployeeDrawerClose,
  } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();

  const [selectedEmployee, setSelectedEmployee] = useState<IDrawerEmployee>();
  const [isDeleting, setIsDeleting] = useState<boolean>();

  const { data: getEmployeesQueryData } = useGetEmployeesQuery({
    onError: (error) => {
      errorToast(error);
    },
  });

  const [deleteEmployee] = useDeleteEmployeeMutation({
    onCompleted: () => {
      appToast({
        title: t('toasts.titles.deleteEmployeeSuccess'),
        description: t('toasts.descriptions.deleteEmployeeSuccess'),
      });
    },
    onError: (error) => errorToast(error),
  });

  const sendDeleteProduct = async () => {
    if (!selectedEmployee) return;
    setIsDeleting(true);
    await deleteEmployee({ variables: { employeeId: selectedEmployee.id } });
    setIsDeleting(false);
    onDeleteModalClose();
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
    setSelectedEmployee(undefined);
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
      <VStack maxW={{ md: 500 }} align="stretch" divider={<StackDivider />}>
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
