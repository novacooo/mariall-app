import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { useColorContext } from 'contexts/ColorContext';
import { MENU } from 'theme/translations';

interface SidebarMenuProps {
  children: React.ReactNode;
}

const SidebarMenu = ({ children }: SidebarMenuProps) => {
  const { accentColor } = useColorContext();

  const headerColor = useColorModeValue(
    `${accentColor}.500`,
    `${accentColor}.300`,
  );

  return (
    <Flex direction="column" gap={2}>
      <Text
        fontSize="xs"
        textTransform="uppercase"
        fontWeight="bold"
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
