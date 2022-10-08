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

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteButtonClick: () => void;
}

const DeleteProductModal = ({ isOpen, onClose, onDeleteButtonClick }: DeleteProductModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Delete product</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <Text>Are you sure?</Text>
      </ModalBody>
      <ModalFooter>
        <Button mr={3} onClick={onClose}>
          Cancel
        </Button>
        <Button colorScheme="red" onClick={onDeleteButtonClick}>
          Delete
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default DeleteProductModal;
