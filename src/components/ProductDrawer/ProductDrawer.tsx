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
  Text,
} from '@chakra-ui/react';
import { FiSave, FiTrash2 } from 'react-icons/fi';
import { selectThemeAccentColor } from 'features/theme/themeSlice';
import { useAppSelector } from 'hooks';
import { useTranslation } from 'react-i18next';

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

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{t('drawers.headers.productEdition')}</DrawerHeader>
        {product ? (
          <>
            <DrawerBody>
              <Text>{product.id}</Text>
              <Text>{product.code}</Text>
              <Text>{product.name}</Text>
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
