import { useState } from 'react';
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useAppToast, useErrorToast } from 'hooks';
import { GetEmployeesDocument, useCreateEmployeeMutation } from 'graphql/generated/schema';
import EmployeeForm, { IEmployeeValues } from 'components/EmployeeForm/EmployeeForm';
import { useLogger } from 'hooks/useLogger';
import { getErrorMessage } from 'helpers';

interface AddEmployeeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialEmployeeValues: IEmployeeValues = {
  employeeValueFirstName: '',
  employeeValueLastName: '',
};

const AddEmployeeDrawer = ({ isOpen, onClose }: AddEmployeeDrawerProps) => {
  const { t } = useTranslation();
  const appToast = useAppToast();
  const errorToast = useErrorToast();
  const logger = useLogger();

  const [isSending, setIsSending] = useState<boolean>();

  const [createEmployee] = useCreateEmployeeMutation({
    refetchQueries: [GetEmployeesDocument],
    onCompleted: (data) => {
      appToast({
        title: t('toasts.titles.createEmployeeSuccess'),
        description: t('toasts.descriptions.createEmployeeSuccess'),
      });
      logger.sendInfoLog(`Utworzono pracownika o ID: ${data.createEmployee?.data?.id || ''}`);
    },
    onError: (error) => {
      errorToast(error);
      logger.sendErrorLog(`Nie udało się utworzyć pracownika. Error: ${getErrorMessage(error)}`);
    },
  });

  const handleSubmit = async (values: IEmployeeValues) => {
    const { employeeValueFirstName, employeeValueLastName } = values;

    setIsSending(true);

    await createEmployee({
      variables: {
        firstName: employeeValueFirstName,
        lastName: employeeValueLastName,
      },
    });

    setIsSending(false);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{t('drawers.headers.addEmployee')}</DrawerHeader>
        <DrawerBody>
          <EmployeeForm initialValues={initialEmployeeValues} isLoadingSaveButton={isSending} onSubmit={handleSubmit} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default AddEmployeeDrawer;
