import { Box, Text, useColorModeValue } from '@chakra-ui/react';

interface SidebarItemProps {
  children: string;
  active?: boolean;
}

const SidebarItem = ({ children, active = false }: SidebarItemProps) => {
  const bgColorActive = useColorModeValue('teal.50', 'teal.900');
  const textColorActive = useColorModeValue('teal.700', 'teal.100');

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
