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
import { FiTrash2 } from 'react-icons/fi';

import { IWorker } from 'components/WorkerSelects/WorkerSelects';
import { useTranslation } from 'react-i18next';

interface EmployeeDrawerProps {
  employee: IWorker | undefined;
  isOpen: boolean;
  onClose: () => void;
  onDeleteButtonClick?: () => void;
}

const EmployeeDrawer = ({ employee, isOpen, onClose, onDeleteButtonClick }: EmployeeDrawerProps) => {
  const { t } = useTranslation();

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{t('drawers.headers.editEmployee')}</DrawerHeader>
        {employee ? (
          <>
            <DrawerBody>
              <Text>{employee.id}</Text>
              <Text>{employee.name}</Text>
            </DrawerBody>
            <DrawerFooter flexDirection="column" alignItems="stretch" gap={4}>
              <Button rightIcon={<FiTrash2 />} colorScheme="red" variant="ghost" onClick={onDeleteButtonClick}>
                {t('buttons.deleteEmployee')}
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

export default EmployeeDrawer;
