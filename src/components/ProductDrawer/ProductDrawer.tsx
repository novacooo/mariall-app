import { ChangeEvent, useRef, useState } from 'react';
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
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  InputRightAddon,
  Spinner,
  useColorModeValue,
  Box,
  Text,
  VStack,
  Switch,
  FormErrorMessage,
  useDisclosure,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FiDollarSign, FiFileText, FiHash, FiSave, FiTrash2, FiUpload } from 'react-icons/fi';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useAppSelector, useAppToast, useErrorToast } from 'hooks';
import { checkIsFileImage, checkIsNumberDecimal } from 'helpers';
import { selectThemeAccentColor } from 'features/theme/themeSlice';
import PlaceholderImage from 'assets/images/placeholder.jpg';
import { useDeleteProductMutation, useUpdateProductMutation } from 'graphql/generated/schema';
import DeleteProductModal from 'components/DeleteProductModal/DeleteProductModal';
import FileUploadIndicator from 'components/FileUploadIndicator/FileUploadIndicator';

export interface IDrawerProduct {
  id: string;
  code: string;
  name: string;
  price: number;
  active: boolean;
  imageUrl?: string;
}

interface IProductValues {
  productValueImage?: File;
  productValueActive: boolean;
  productValueName: string;
  productValueCode: string;
  productValuePrice: number;
}

interface ProductDrawerProps {
  product: IDrawerProduct | undefined;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDrawer = ({ product, isOpen, onClose }: ProductDrawerProps) => {
  const { t } = useTranslation();
  const appToast = useAppToast();
  const errorToast = useErrorToast();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();

  const themeAccentColor = useAppSelector(selectThemeAccentColor);

  const adaptiveAccentColor = useColorModeValue(`${themeAccentColor}.600`, `${themeAccentColor}.200`);

  const [isSending, setIsSending] = useState<boolean>();
  const [isDeleting, setIsDeleting] = useState<boolean>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [updateProduct] = useUpdateProductMutation({
    onError: (error) => errorToast(error),
  });

  const [deleteProduct] = useDeleteProductMutation({
    onError: (error) => errorToast(error),
  });

  const sendUpdateProduct = async (values: IProductValues) => {
    if (!product) return;

    if (values.productValueImage) return;

    const { productValueActive, productValueName, productValueCode, productValuePrice } = values;

    setIsSending(true);

    await updateProduct({
      variables: {
        id: product.id,
        code: productValueCode,
        name: productValueName,
        price: productValuePrice,
        active: productValueActive,
      },
    });

    setIsSending(false);
    onClose();

    appToast({
      title: t('toasts.titles.updateProductSuccess'),
      description: t('toasts.descriptions.updateProductSuccess'),
    });
  };

  const sendDeleteProduct = async () => {
    if (!product) return;

    setIsDeleting(true);

    await deleteProduct({
      variables: {
        id: product.id,
      },
    });

    setIsDeleting(false);
    onDeleteModalClose();
    onClose();

    appToast({
      title: t('toasts.titles.deleteProductSuccess'),
      description: t('toasts.descriptions.deleteProductSuccess'),
    });
  };

  const initialProductValues = {
    productValueActive: product ? product.active : false,
    productValueName: product ? product.name : '',
    productValueCode: product ? product.code : '',
    productValuePrice: product ? product.price : 0,
  };

  const productValidationSchema: yup.SchemaOf<IProductValues> = yup.object().shape({
    productValueImage: yup.mixed().test('is-image', 'Plik musi być zdjęciem!', checkIsFileImage),
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
      void sendUpdateProduct(values);
    },
  });

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    void formik.setFieldValue('productValueImage', file);
  };

  const handleDeleteButtonClick = () => {
    onDeleteModalOpen();
  };

  const handleModalDeleteButtonClick = () => {
    void sendDeleteProduct();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{t('drawers.headers.productEdition')}</DrawerHeader>
        {product ? (
          <>
            <DrawerBody>
              <form onSubmit={formik.handleSubmit}>
                <VStack spacing={4} mb={8}>
                  <Box position="relative">
                    <Image
                      w={40}
                      h={40}
                      rounded="md"
                      borderWidth={1}
                      borderStyle="solid"
                      src={product.imageUrl || PlaceholderImage}
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
                    {formik.errors.productValueActive && (
                      <FormErrorMessage>{formik.errors.productValueActive}</FormErrorMessage>
                    )}
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
                    {formik.errors.productValueName && (
                      <FormErrorMessage>{formik.errors.productValueName}</FormErrorMessage>
                    )}
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
                    {formik.errors.productValueCode && (
                      <FormErrorMessage>{formik.errors.productValueCode}</FormErrorMessage>
                    )}
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
                    {formik.errors.productValuePrice && (
                      <FormErrorMessage>{formik.errors.productValuePrice}</FormErrorMessage>
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
                {t('buttons.deleteProduct')}
              </Button>
            </DrawerFooter>
          </>
        ) : (
          <DrawerBody>
            <Spinner />
          </DrawerBody>
        )}
      </DrawerContent>
      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        isLoading={isDeleting}
        onClose={onDeleteModalClose}
        onDeleteButtonClick={handleModalDeleteButtonClick}
      />
    </Drawer>
  );
};

export default ProductDrawer;
