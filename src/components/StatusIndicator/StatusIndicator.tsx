import { Box, HStack, Text } from '@chakra-ui/react';

interface StatusIndicatorProps {
  active: boolean;
}

const StatusIndicator = ({ active }: StatusIndicatorProps) => (
  <HStack px={2} py={1} spacing={1} rounded="full" bgColor={active ? 'green.50' : 'red.50'}>
    <Box w={2} h={2} bgColor={active ? 'green.500' : 'red.500'} rounded="full" />
    <Text fontSize="xs" fontWeight="semibold" lineHeight="none" color={active ? 'green.500' : 'red.500'}>
      {active ? 'Aktywny' : 'Nieaktywny'}
    </Text>
  </HStack>
);

export default StatusIndicator;
