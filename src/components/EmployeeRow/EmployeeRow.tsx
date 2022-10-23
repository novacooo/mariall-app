import { HStack, Text, IconButton, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { IWorker } from 'components/WorkerSelects/WorkerSelects';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

interface EmployeeRowProps {
  employee: IWorker;
  onEditButtonClick?: () => void;
  onTrashButtonClick?: () => void;
}

const EmployeeRow = ({ employee, onEditButtonClick, onTrashButtonClick }: EmployeeRowProps) => {
  const { t } = useTranslation();

  const trashIconColor = useColorModeValue('red.500', 'red.400');

  return (
    <HStack spacing={4} p={2} justify="space-between">
      <Text fontSize="sm" fontWeight="semibold">
        {employee.name}
      </Text>
      <HStack spacing={3}>
        <Tooltip label={t('tooltips.editEmployee')}>
          <IconButton aria-label={t('tooltips.editEmployee')} icon={<FiEdit2 />} onClick={onEditButtonClick} />
        </Tooltip>
        <Tooltip label={t('tooltips.deleteEmployee')}>
          <IconButton
            aria-label={t('tooltips.deleteEmployee')}
            color={trashIconColor}
            icon={<FiTrash2 />}
            onClick={onTrashButtonClick}
          />
        </Tooltip>
      </HStack>
    </HStack>
  );
};

export default EmployeeRow;
