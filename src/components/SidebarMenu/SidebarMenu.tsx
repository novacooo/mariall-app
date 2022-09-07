import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface SidebarMenuProps {
  name: string;
  children: ReactNode;
}

const SidebarMenu = ({ name, children }: SidebarMenuProps) => {
  const headerColor = useColorModeValue('gray.400', 'gray.500');

  return (
    <Flex direction="column" gap={2}>
      <Text
        fontSize="xs"
        textTransform="uppercase"
        fontWeight="semibold"
        color={headerColor}
        letterSpacing="wider"
        px={3}
      >
        {name}
      </Text>
      <Flex direction="column" gap={1}>
        {children}
      </Flex>
    </Flex>
  );
};

export default SidebarMenu;
