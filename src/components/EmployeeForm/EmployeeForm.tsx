import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FiSave } from 'react-icons/fi';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useAppSelector } from 'hooks';
import { selectThemeAccentColor } from 'features/theme/themeSlice';

export interface IEmployeeValues {
  employeeValueFirstName: string;
  employeeValueLastName: string;
}

interface EmployeeFormProps {
  initialValues: IEmployeeValues;
  isLoadingSaveButton?: boolean;
  onSubmit: (values: IEmployeeValues) => Promise<void>;
}

const EmployeeForm = ({ initialValues, isLoadingSaveButton, onSubmit }: EmployeeFormProps) => {
  const { t } = useTranslation();

  const themeAccentColor = useAppSelector(selectThemeAccentColor);

  const adaptiveAccentColor = useColorModeValue(`${themeAccentColor}.600`, `${themeAccentColor}.200`);

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
    initialValues,
    enableReinitialize: true,
    validationSchema: employeeValidationSchema,
    onSubmit: (values) => {
      void onSubmit(values);
    },
  });

  return (
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
          isLoading={isLoadingSaveButton}
          loadingText={t('loading.saving')}
        >
          {t('buttons.saveChanges')}
        </Button>
      </Flex>
    </form>
  );
};

export default EmployeeForm;
