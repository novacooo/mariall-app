import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface DeleteProductModalProps {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onDeleteButtonClick: () => void;
}

const DeleteProductModal = ({ isOpen, isLoading, onClose, onDeleteButtonClick }: DeleteProductModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('modals.headers.deleteProduct')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{t('modals.descriptions.deleteProduct')}</Text>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            {t('buttons.cancel')}
          </Button>
          <Button
            colorScheme="red"
            loadingText={t('loading.deleting')}
            isLoading={isLoading}
            onClick={onDeleteButtonClick}
          >
            {t('buttons.deleteProduct')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteProductModal;
