import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { useColorContext } from 'contexts/ColorContext';

interface SidebarItemProps {
  children: string;
  active?: boolean;
}

const SidebarItem = ({ children, active = false }: SidebarItemProps) => {
  const { accentColor } = useColorContext();

  const bgOpacity = useColorModeValue(0.4, 0.3);
  const bgColorHover = useColorModeValue('gray.100', 'gray.700');
  const bgColorActive = useColorModeValue(
    `${accentColor}.100`,
    `${accentColor}.900`,
  );
  const textColorActive = useColorModeValue(
    `${accentColor}.700`,
    `${accentColor}.100`,
  );

  return (
    <Box
      position="relative"
      px={3}
      py={2}
      rounded="md"
      transition="background-color 0.2s"
      letterSpacing="wide"
      userSelect="none"
      _before={{
        content: '""',
        pos: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        bgColor: active ? bgColorActive : 'transparent',
        opacity: bgOpacity,
        rounded: 'md',
      }}
      _hover={{
        cursor: 'pointer',
        _before: {
          bgColor: active ? bgColorActive : bgColorHover,
          opacity: active ? bgOpacity : 1,
        },
      }}
    >
      <Text
        position="relative"
        zIndex={1}
        fontSize="sm"
        fontWeight={active ? 'medium' : 'normal'}
        color={active ? textColorActive : 'normal'}
      >
        {children}
      </Text>
    </Box>
  );
};

export default SidebarItem;
