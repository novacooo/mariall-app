import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { MENU } from 'theme/translations';

interface SidebarMenuProps {
  children: React.ReactNode;
}

const SidebarMenu = ({ children }: SidebarMenuProps) => {
  const headerColor = useColorModeValue('teal.500', 'teal.300');

  return (
    <Flex direction="column" gap={2}>
      <Text
        fontSize="xs"
        textTransform="uppercase"
        fontWeight="medium"
        color={headerColor}
        letterSpacing="wider"
        px={3}
      >
        {MENU}
      </Text>
      <Flex direction="column" gap={1}>
        {children}
      </Flex>
    </Flex>
  );
};

export default SidebarMenu;
