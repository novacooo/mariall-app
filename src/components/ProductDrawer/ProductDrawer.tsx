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
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiFileText, FiHash, FiSave, FiTrash2 } from 'react-icons/fi';
import { selectThemeAccentColor } from 'features/theme/themeSlice';
import { useAppSelector } from 'hooks';
import { useTranslation } from 'react-i18next';
import { useEffect, useId, useState } from 'react';

export interface IDrawerProduct {
  id: string;
  code: string;
  name: string;
  price: number;
  active: boolean;
}

interface ProductDrawerProps {
  product: IDrawerProduct | undefined;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDrawer = ({ product, isOpen, onClose }: ProductDrawerProps) => {
  const { t } = useTranslation();

  const themeAccentColor = useAppSelector(selectThemeAccentColor);

  const [nameValue, setNameValue] = useState<string>();
  const [codeValue, setCodeValue] = useState<string>();

  const nameId = useId();
  const codeId = useId();

  const adaptiveAccentColor = useColorModeValue(`${themeAccentColor}.600`, `${themeAccentColor}.200`);

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNameValue(value);
  };

  const handleCodeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCodeValue(value);
  };

  useEffect(() => {
    if (!product) return;

    const { name, code } = product;

    setNameValue(name);
    setCodeValue(code);
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
              <Flex direction="column" gap={4}>
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
              </Flex>
              <Text>{product.price}</Text>
              <Text>{product.active}</Text>
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
