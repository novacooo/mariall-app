import { Box, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface StatusIndicatorProps {
  active: boolean;
}

const StatusIndicator = ({ active }: StatusIndicatorProps) => {
  const { t } = useTranslation();

  const activeColor = useColorModeValue('green.500', 'green.300');
  const inactiveColor = useColorModeValue('red.500', 'red.300');
  const activeBgColor = useColorModeValue('green.100', 'green.600');
  const inactiveBgColor = useColorModeValue('red.100', 'red.600');
  const bgOpacity = useColorModeValue(0.4, 0.15);

  return (
    <HStack
      position="relative"
      px={2}
      py={1}
      spacing={2}
      _before={{
        content: '""',
        pos: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        bgColor: active ? activeBgColor : inactiveBgColor,
        opacity: bgOpacity,
        rounded: 'full',
      }}
    >
      <Box w={2} h={2} bgColor={active ? activeColor : inactiveColor} rounded="full" zIndex={0} />
      <Text
        fontSize="xs"
        fontWeight="semibold"
        lineHeight="none"
        color={active ? activeColor : inactiveColor}
        zIndex={0}
      >
        {active ? t('indicators.active') : t('indicators.inactive')}
      </Text>
    </HStack>
  );
};

export default StatusIndicator;
