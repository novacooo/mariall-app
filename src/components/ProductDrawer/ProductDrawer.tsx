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
import { ChangeEvent, useEffect, useId, useState } from 'react';
import { FiDollarSign, FiFileText, FiHash, FiSave, FiTrash2, FiUpload } from 'react-icons/fi';
import { selectThemeAccentColor } from 'features/theme/themeSlice';
import { useAppSelector } from 'hooks';
import PlaceholderImage from 'assets/images/placeholder.jpg';

export interface IDrawerProduct {
  id: string;
  code: string;
  name: string;
  price: number;
  active: boolean;
  imageUrl?: string;
}

interface ProductDrawerProps {
  product: IDrawerProduct | undefined;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDrawer = ({ product, isOpen, onClose }: ProductDrawerProps) => {
  const { t } = useTranslation();

  const themeAccentColor = useAppSelector(selectThemeAccentColor);

  const [isActive, setIsActive] = useState<boolean>();
  const [nameValue, setNameValue] = useState<string>();
  const [codeValue, setCodeValue] = useState<string>();
  const [priceValue, setPriceValue] = useState<string>();

  const nameId = useId();
  const codeId = useId();
  const priceId = useId();
  const activeId = useId();

  const adaptiveAccentColor = useColorModeValue(`${themeAccentColor}.600`, `${themeAccentColor}.200`);

  const handleActiveSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsActive(checked);
  };

  const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNameValue(value);
  };

  const handleCodeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCodeValue(value);
  };

  const handlePriceInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPriceValue(value);
  };

  useEffect(() => {
    if (!product) return;

    const { name, code, price, active } = product;

    setIsActive(active);
    setNameValue(name);
    setCodeValue(code);
    setPriceValue(price.toString());
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
              <Flex direction="column" gap={6}>
                <FormControl>
                  <FormLabel>{t('labels.productVisibility')}</FormLabel>
                  <Flex justify="space-between" align="center">
                    <Text as="label" htmlFor={activeId}>
                      {t('switches.productVisibility')}
                    </Text>
                    <Switch
                      id={activeId}
                      colorScheme={themeAccentColor}
                      isChecked={isActive}
                      onChange={handleActiveSwitchChange}
                    />
                  </Flex>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor={nameId}>{t('inputs.productName')}</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" color="gray.500">
                      <FiFileText />
                    </InputLeftElement>
                    <Input
                      id={nameId}
                      type="text"
                      focusBorderColor={adaptiveAccentColor}
                      value={nameValue}
                      placeholder={t('inputs.productName')}
                      onChange={handleNameInputChange}
                      variant="filled"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor={codeId}>{t('inputs.productCode')}</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" color="gray.500">
                      <FiHash />
                    </InputLeftElement>
                    <Input
                      id={codeId}
                      type="text"
                      focusBorderColor={adaptiveAccentColor}
                      value={codeValue}
                      placeholder={t('inputs.productCode')}
                      onChange={handleCodeInputChange}
                      variant="filled"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor={priceId}>{t('inputs.productPrice')}</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" color="gray.500">
                      <FiDollarSign />
                    </InputLeftElement>
                    <Input
                      id={priceId}
                      type="number"
                      focusBorderColor={adaptiveAccentColor}
                      value={priceValue}
                      placeholder={t('inputs.productPrice')}
                      onChange={handlePriceInputChange}
                      variant="filled"
                    />
                    <InputRightAddon>{t('texts.currency')}</InputRightAddon>
                  </InputGroup>
                </FormControl>
              </Flex>
            </DrawerBody>
            <DrawerFooter flexDirection="column" alignItems="stretch" gap={4}>
              <Button colorScheme={themeAccentColor} rightIcon={<FiSave />}>
                {t('buttons.saveChanges')}
              </Button>
              <Button rightIcon={<FiTrash2 />} colorScheme="red" variant="outline">
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
