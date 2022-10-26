import { useState } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Spinner,
} from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import { useAppToast, useErrorToast } from 'hooks';
import { useUpdateEmployeeMutation } from 'graphql/generated/schema';
import EmployeeForm, { IEmployeeValues } from 'components/EmployeeForm/EmployeeForm';
import { useLogger } from 'hooks/useLogger';
import { getErrorMessage } from 'helpers';

export interface IDrawerEmployee {
  id: string;
  firstName: string;
  lastName: string | null | undefined;
}

interface EmployeeDrawerProps {
  employee: IDrawerEmployee | undefined;
  isOpen: boolean;
  onClose: () => void;
  onDeleteButtonClick: (values: IDrawerEmployee) => void;
}

const EmployeeDrawer = ({ employee, isOpen, onClose, onDeleteButtonClick }: EmployeeDrawerProps) => {
  const { t } = useTranslation();
  const appToast = useAppToast();
  const errorToast = useErrorToast();
  const logger = useLogger();

  const [isSending, setIsSending] = useState<boolean>();

  const [updateEmployee] = useUpdateEmployeeMutation({
    onCompleted: (data) => {
      appToast({
        title: t('toasts.titles.updateEmployeeSuccess'),
        description: t('toasts.descriptions.updateEmployeeSuccess'),
      });
      logger.sendInfoLog(`Zaktualizowano pracownika ID: ${data.updateEmployee?.data?.id || ''}`);
    },
    onError: (error) => {
      errorToast(error);
      logger.sendErrorLog(`Nie udało się zaktualizować pracownika. Error: ${getErrorMessage(error)}`);
    },
  });

  const initialEmployeeValues: IEmployeeValues = {
    employeeValueFirstName: employee ? employee.firstName : '',
    employeeValueLastName: employee && employee.lastName ? employee.lastName : '',
  };

  const sendUpdateEmployee = async (values: IEmployeeValues) => {
    if (!employee) return;

    const { employeeValueFirstName, employeeValueLastName } = values;

    setIsSending(true);

    await updateEmployee({
      variables: {
        employeeId: employee.id,
        firstName: employeeValueFirstName,
        lastName: employeeValueLastName,
      },
    });

    setIsSending(false);
    onClose();
  };

  const handleDeleteButtonClick = () => {
    if (!employee) return;
    onDeleteButtonClick(employee);
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{t('drawers.headers.editEmployee')}</DrawerHeader>
        {employee ? (
          <>
            <DrawerBody>
              <EmployeeForm
                initialValues={initialEmployeeValues}
                isLoadingSaveButton={isSending}
                onSubmit={sendUpdateEmployee}
              />
            </DrawerBody>
            <DrawerFooter flexDirection="column" alignItems="stretch" gap={4}>
              <Button rightIcon={<FiTrash2 />} colorScheme="red" variant="ghost" onClick={handleDeleteButtonClick}>
                {t('buttons.deleteEmployee')}
              </Button>
            </DrawerFooter>
          </>
        ) : (
          <DrawerBody>
            <Spinner />
          </DrawerBody>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default EmployeeDrawer;
