import {
  Avatar,
  Button,
  Flex,
  HStack,
  StackDivider,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactComponent as Logo } from 'assets/logo_mariall.svg';

const data = {
  userName: 'Jacek Nowak',
  appTitle: 'Zarządzanie produkcją',
};

const TopBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.100', 'gray.700');
  const color = useColorModeValue('white', 'gray.800');

  return (
    <Flex
      px={8}
      py={4}
      justify="space-between"
      align="center"
      borderBottomWidth="1px"
      bgColor={bg}
    >
      <HStack spacing={5} divider={<StackDivider />}>
        <Logo height={36} />
        <Text>{data.appTitle}</Text>
      </HStack>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'dark' : 'light'}
      </Button>
      <HStack spacing={3}>
        <Text>{data.userName}</Text>
        <Avatar name={data.userName} size="sm" />
      </HStack>
    </Flex>
  );
};

export default TopBar;
