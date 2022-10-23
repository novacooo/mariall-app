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
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiSave, FiTrash2 } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { useAppSelector, useAppToast, useErrorToast } from 'hooks';
import { selectThemeAccentColor } from 'features/theme/themeSlice';
import { useUpdateEmployeeMutation } from 'graphql/generated/schema';

export interface IDrawerEmployee {
  id: string;
  firstName: string;
  lastName: string | null | undefined;
}
interface IEmployeeValues {
  employeeValueFirstName: string;
  employeeValueLastName: string;
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

  const themeAccentColor = useAppSelector(selectThemeAccentColor);

  const adaptiveAccentColor = useColorModeValue(`${themeAccentColor}.600`, `${themeAccentColor}.200`);

  const [isSending, setIsSending] = useState<boolean>();

  const [updateEmployee] = useUpdateEmployeeMutation({
    onCompleted: () => {
      appToast({
        title: t('toasts.titles.updateEmployeeSuccess'),
        description: t('toasts.descriptions.updateEmployeeSuccess'),
      });
    },
    onError: (error) => errorToast(error),
  });

  const sendUpdateEmployee = async (values: IEmployeeValues) => {
    if (!employee) return;

    const { employeeValueFirstName, employeeValueLastName } = values;

    setIsSending(true);

    await updateEmployee({
      variables: {
        employeeId: employee.id,
        firstName: employeeValueFirstName,
        lastName: employeeValueLastName || '',
      },
    });

    setIsSending(false);
    onClose();
  };

  const initialEmployeeValues: IEmployeeValues = {
    employeeValueFirstName: employee ? employee.firstName : '',
    employeeValueLastName: employee && employee.lastName ? employee.lastName : '',
  };

  const employeeValidationSchema: yup.SchemaOf<IEmployeeValues> = yup.object().shape({
    employeeValueFirstName: yup
      .string()
      .min(2, t('errors.employeeFirstNameTooShort'))
      .required(t('errors.notCompletedEmployeeFirstName')),
    employeeValueLastName: yup
      .string()
      .min(2, t('errors.employeeLastNameTooShort'))
      .required(t('errors.notCompletedEmployeeLastName')),
  });

  const formik = useFormik<IEmployeeValues>({
    initialValues: initialEmployeeValues,
    enableReinitialize: true,
    validationSchema: employeeValidationSchema,
    onSubmit: (values) => {
      void sendUpdateEmployee(values);
    },
  });

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
              <form onSubmit={formik.handleSubmit}>
                <Flex direction="column" gap={6}>
                  <FormControl isInvalid={!!formik.errors.employeeValueFirstName}>
                    <FormLabel htmlFor="employeeValueFirstName">{t('inputs.employeeFirstName')}</FormLabel>
                    <Input
                      id="employeeValueFirstName"
                      type="text"
                      focusBorderColor={adaptiveAccentColor}
                      value={formik.values.employeeValueFirstName}
                      placeholder={t('inputs.employeeFirstName')}
                      onChange={formik.handleChange}
                      variant="filled"
                    />
                    {formik.errors.employeeValueFirstName && (
                      <FormErrorMessage>{formik.errors.employeeValueFirstName}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={!!formik.errors.employeeValueLastName}>
                    <FormLabel htmlFor="employeeValueLastName">{t('inputs.employeeLastName')}</FormLabel>
                    <Input
                      id="employeeValueLastName"
                      type="text"
                      focusBorderColor={adaptiveAccentColor}
                      value={formik.values.employeeValueLastName}
                      placeholder={t('inputs.employeeLastName')}
                      onChange={formik.handleChange}
                      variant="filled"
                    />
                    {formik.errors.employeeValueLastName && (
                      <FormErrorMessage>{formik.errors.employeeValueLastName}</FormErrorMessage>
                    )}
                  </FormControl>
                  <Button
                    type="submit"
                    disabled={!formik.isValid || !formik.dirty}
                    colorScheme={themeAccentColor}
                    rightIcon={<FiSave />}
                    isLoading={isSending}
                    loadingText={t('loading.saving')}
                  >
                    {t('buttons.saveChanges')}
                  </Button>
                </Flex>
              </form>
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
