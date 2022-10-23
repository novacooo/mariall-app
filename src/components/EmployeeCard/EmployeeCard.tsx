import { HStack, useColorModeValue, Text } from '@chakra-ui/react';

import { IWorker } from 'components/WorkerSelects/WorkerSelects';
import { selectThemeAccentColor } from 'features/theme/themeSlice';
import { useAppSelector } from 'hooks';

interface EmployeeCardProps {
  employee: IWorker;
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const themeAccentColor = useAppSelector(selectThemeAccentColor);

  const bg = useColorModeValue('white', 'gray.800');
  const accentColor = useColorModeValue(`${themeAccentColor}.600`, `${themeAccentColor}.200`);

  return (
    <HStack
      spacing={4}
      p={4}
      w={['full', 'auto']}
      bg={bg}
      borderWidth={1}
      rounded="md"
      transition="border-color 0.2s, transform 0.2s"
      role="group"
      _hover={{
        cursor: 'pointer',
        borderColor: accentColor,
        transform: 'scale(1.02)',
      }}
    >
      <Text fontSize="sm" textAlign="center" textTransform="uppercase" fontWeight="semibold" noOfLines={1}>
        {employee.name}
      </Text>
    </HStack>
  );
};

export default EmployeeCard;
