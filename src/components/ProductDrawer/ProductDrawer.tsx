import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { selectThemeAccentColor } from 'features/theme/themeSlice';
import { useAppSelector } from 'hooks';

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
  const themeAccentColor = useAppSelector(selectThemeAccentColor);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Edycja produktu</DrawerHeader>
        {product ? (
          <>
            <DrawerBody>
              <Text>{product.id}</Text>
              <Text>{product.code}</Text>
              <Text>{product.name}</Text>
              <Text>{product.price}</Text>
              <Text>{product.active}</Text>
            </DrawerBody>
            <DrawerFooter>
              <Button w="full" colorScheme={themeAccentColor}>
                Zapisz zmiany
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
