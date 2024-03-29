import { ChangeEvent, useRef } from 'react';
import {
  Box,
  VStack,
  Image,
  Input,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Text,
  InputGroup,
  InputRightAddon,
  FormErrorMessage,
  InputLeftElement,
  useColorModeValue,
  Switch,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { FiDollarSign, FiFileText, FiHash, FiSave, FiUpload } from 'react-icons/fi';
import * as yup from 'yup';

import { useAppSelector } from 'hooks';
import { checkIsFileImage, checkIsNumberDecimal } from 'helpers';
import { selectThemeAccentColor } from 'features/theme/themeSlice';
import FileUploadIndicator from 'components/FileUploadIndicator/FileUploadIndicator';
import { IDrawerProduct } from 'components/ProductDrawer/ProductDrawer';
import PlaceholderImage from 'assets/images/placeholder.jpg';

export interface IProductValues {
  productValueImage?: File;
  productValueActive: boolean;
  productValueName: string;
  productValueCode: string;
  productValuePrice: number;
}

interface ProductFormProps {
  initialProductValues: IProductValues;
  product?: IDrawerProduct;
  onSubmit: (values: IProductValues) => Promise<void>;
  isLoadingSaveButton?: boolean;
}

const ProductForm = ({ initialProductValues, product, onSubmit, isLoadingSaveButton }: ProductFormProps) => {
  const { t } = useTranslation();

  const themeAccentColor = useAppSelector(selectThemeAccentColor);

  const adaptiveAccentColor = useColorModeValue(`${themeAccentColor}.600`, `${themeAccentColor}.200`);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const productValidationSchema: yup.SchemaOf<IProductValues> = yup.object().shape({
    productValueImage: yup.mixed().test('is-image', t('errors.productImageWrongType'), checkIsFileImage),
    productValueActive: yup.boolean().required(),
    productValueName: yup
      .string()
      .min(2, t('errors.productNameTooShort'))
      .max(80, t('errors.productNameTooLong'))
      .required(t('errors.notCompletedProductName')),
    productValueCode: yup
      .string()
      .min(2, t('errors.productCodeTooShort'))
      .max(15, t('errors.productCodeTooLong'))
      .required(t('errors.notCompletedProductCode')),
    productValuePrice: yup
      .number()
      .min(0, t('errors.productPriceTooSmall'))
      .test('is-decimal', t('errors.productPriceWrongPattern'), checkIsNumberDecimal)
      .required(t('errors.notCompletedProductPrice')),
  });

  const formik = useFormik<IProductValues>({
    initialValues: initialProductValues,
    enableReinitialize: true,
    validationSchema: productValidationSchema,
    onSubmit: (values) => {
      void onSubmit(values);
    },
  });

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    void formik.setFieldValue('productValueImage', file);
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleTrashButtonClick = () => {
    void formik.setFieldValue('productValueImage', undefined);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <VStack spacing={4} mb={8}>
        <Box position="relative">
          <Image
            w={40}
            h={40}
            rounded="md"
            borderWidth={1}
            objectFit="cover"
            borderStyle="solid"
            src={product?.imageUrl || PlaceholderImage}
          />
        </Box>
        <Input
          id="productValueImage"
          display="none"
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleFileInputChange}
        />
        {formik.values.productValueImage && (
          <FileUploadIndicator
            file={formik.values.productValueImage}
            error={formik.errors.productValueImage}
            onTrashButtonClick={handleTrashButtonClick}
          />
        )}
        <Button size="sm" variant="outline" rightIcon={<FiUpload />} onClick={handleUploadButtonClick}>
          {t('buttons.uploadImage')}
        </Button>
      </VStack>
      <Flex direction="column" gap={6}>
        <FormControl isInvalid={!!formik.errors.productValueActive}>
          <FormLabel>{t('labels.productVisibility')}</FormLabel>
          <Flex justify="space-between" align="center">
            <Text as="label" htmlFor="productValueActive">
              {t('switches.productVisibility')}
            </Text>
            <Switch
              id="productValueActive"
              colorScheme={themeAccentColor}
              isChecked={formik.values.productValueActive}
              onChange={formik.handleChange}
            />
          </Flex>
          {formik.errors.productValueActive && <FormErrorMessage>{formik.errors.productValueActive}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={!!formik.errors.productValueName}>
          <FormLabel htmlFor="productValueName">{t('inputs.productName')}</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="gray.500">
              <FiFileText />
            </InputLeftElement>
            <Input
              id="productValueName"
              type="text"
              focusBorderColor={adaptiveAccentColor}
              value={formik.values.productValueName}
              placeholder={t('inputs.productName')}
              onChange={formik.handleChange}
              variant="filled"
            />
          </InputGroup>
          {formik.errors.productValueName && <FormErrorMessage>{formik.errors.productValueName}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={!!formik.errors.productValueCode}>
          <FormLabel htmlFor="productValueCode">{t('inputs.productCode')}</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="gray.500">
              <FiHash />
            </InputLeftElement>
            <Input
              id="productValueCode"
              type="text"
              focusBorderColor={adaptiveAccentColor}
              value={formik.values.productValueCode}
              placeholder={t('inputs.productCode')}
              onChange={formik.handleChange}
              variant="filled"
            />
          </InputGroup>
          {formik.errors.productValueCode && <FormErrorMessage>{formik.errors.productValueCode}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={!!formik.errors.productValuePrice}>
          <FormLabel htmlFor="productValuePrice">{t('inputs.productPrice')}</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="gray.500">
              <FiDollarSign />
            </InputLeftElement>
            <Input
              id="productValuePrice"
              type="number"
              focusBorderColor={adaptiveAccentColor}
              value={formik.values.productValuePrice}
              placeholder={t('inputs.productPrice')}
              onChange={formik.handleChange}
              variant="filled"
            />
            <InputRightAddon>{t('texts.currency')}</InputRightAddon>
          </InputGroup>
          {formik.errors.productValuePrice && <FormErrorMessage>{formik.errors.productValuePrice}</FormErrorMessage>}
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

export default ProductForm;
