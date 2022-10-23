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

interface DeleteEmployeeModalProps {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onDeleteButtonClick: () => void;
}

const DeleteEmployeeModal = ({ isOpen, isLoading, onClose, onDeleteButtonClick }: DeleteEmployeeModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('modals.headers.deleteEmployee')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{t('modals.descriptions.deleteEmployee')}</Text>
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
            {t('buttons.deleteEmployee')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteEmployeeModal;
