import {
  Divider,
  Flex,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

interface SidebarMenuProps {
  name: string;
  children: React.ReactNode;
}

const SidebarMenu = ({ name, children }: SidebarMenuProps) => {
  const headerColor = useColorModeValue('gray.400', 'gray.500');

  return (
    <Flex direction="column" gap={2}>
      <HStack px={3}>
        <Text
          fontSize="xs"
          textTransform="uppercase"
          fontWeight="medium"
          color={headerColor}
          whiteSpace="nowrap"
          letterSpacing="wider"
        >
          {name}
        </Text>
        <Divider />
      </HStack>
      <Flex direction="column" gap={1}>
        {children}
      </Flex>
    </Flex>
  );
};

export default SidebarMenu;
