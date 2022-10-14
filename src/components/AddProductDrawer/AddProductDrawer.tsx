import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Spinner,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface AddProductDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductDrawer = ({ isOpen, onClose }: AddProductDrawerProps) => {
  const { t } = useTranslation();

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{t('drawers.headers.productEdition')}</DrawerHeader>
        <DrawerBody>
          {/* <ProductForm product={product} onSubmit={sendUpdateProduct} isLoadingSaveButton={isSending} /> */}
        </DrawerBody>
        <DrawerFooter flexDirection="column" alignItems="stretch" gap={4} />
        <DrawerBody>
          <Spinner />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default AddProductDrawer;
