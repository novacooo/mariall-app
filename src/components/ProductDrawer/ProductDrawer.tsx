import { useEffect } from 'react';
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
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FiDollarSign, FiFileText, FiHash, FiSave, FiTrash2, FiUpload } from 'react-icons/fi';
import { useFormik } from 'formik';

import { useAppSelector } from 'hooks';
import { selectThemeAccentColor } from 'features/theme/themeSlice';
import PlaceholderImage from 'assets/images/placeholder.jpg';

export interface IDrawerProduct {
  id: string;
  code: string;
  name: string;
  price: number;
  active: boolean;
  imageUrl?: string;
}

interface IProductValues {
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
  const themeAccentColor = useAppSelector(selectThemeAccentColor);

  const adaptiveAccentColor = useColorModeValue(`${themeAccentColor}.600`, `${themeAccentColor}.200`);

  const formik = useFormik<IProductValues>({
    initialValues: {
      productValueActive: false,
      productValueName: '',
      productValueCode: '',
      productValuePrice: 0,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    if (!product) return;

    const { code, name, price, active } = product;

    void formik.setValues({
      productValueActive: active,
      productValueName: name,
      productValueCode: code,
      productValuePrice: price,
    });
  }, [product]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{t('drawers.headers.productEdition')}</DrawerHeader>
        {product ? (
          <>
            <DrawerBody>
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
                <Button size="sm" variant="outline" rightIcon={<FiUpload />}>
                  {t('buttons.uploadImage')}
                </Button>
              </VStack>
              <form onSubmit={formik.handleSubmit}>
                <Flex direction="column" gap={6}>
                  <FormControl>
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
                  </FormControl>
                  <FormControl>
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
                  </FormControl>
                  <FormControl>
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
                  </FormControl>
                  <FormControl>
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
                  </FormControl>
                  <Button type="submit" colorScheme={themeAccentColor} rightIcon={<FiSave />}>
                    {t('buttons.saveChanges')}
                  </Button>
                </Flex>
              </form>
            </DrawerBody>
            <DrawerFooter flexDirection="column" alignItems="stretch" gap={4}>
              <Button rightIcon={<FiTrash2 />} colorScheme="red" variant="ghost">
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
    </Drawer>
  );
};

export default ProductDrawer;
