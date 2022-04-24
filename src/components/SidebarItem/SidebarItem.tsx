import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { useColorContext } from 'contexts/ColorContext';

interface SidebarItemProps {
  children: string;
  active?: boolean;
}

const SidebarItem = ({ children, active = false }: SidebarItemProps) => {
  const { accentColor } = useColorContext();

  const bgColorActive = useColorModeValue(
    `${accentColor}.50`,
    `${accentColor}.900`,
  );
  const textColorActive = useColorModeValue(
    `${accentColor}.700`,
    `${accentColor}.100`,
  );

  return (
    <Box
      px={3}
      py={2}
      bgColor={active ? bgColorActive : 'transparent'}
      rounded="md"
      transition="background-color 0.2s"
      letterSpacing="wide"
      _hover={{
        bgColor: bgColorActive,
        cursor: 'pointer',
      }}
    >
      <Text
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
