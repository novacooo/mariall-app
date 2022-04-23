import {
  Avatar,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  StackDivider,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { ReactComponent as LogoLight } from 'assets/logo_light.svg';
import { ReactComponent as LogoDark } from 'assets/logo_dark.svg';

const data = {
  userName: 'Jacek Nowak',
  appTitle: 'Zarządzanie produkcją',
};

const TopBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const logoHeight = 36;

  return (
    <Flex
      px={6}
      py={3}
      justify="space-between"
      align="center"
      boxShadow="base"
      bgColor={bgColor}
      borderBottomWidth={1}
    >
      <HStack spacing={5} divider={<StackDivider />}>
        {colorMode === 'light' ? (
          <LogoLight height={logoHeight} />
        ) : (
          <LogoDark height={logoHeight} />
        )}
        <Text color={textColor}>{data.appTitle}</Text>
      </HStack>
      <HStack spacing={3}>
        <Tooltip label="Przełącz tryb">
          <IconButton
            onClick={toggleColorMode}
            variant="ghost"
            aria-label="Toggle theme"
            icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
          />
        </Tooltip>
        <Menu size="xs">
          <Tooltip label="Pokaż menu">
            <MenuButton
              as={Button}
              variant="ghost"
              rightIcon={<ChevronDownIcon />}
            >
              <HStack spacing={2}>
                <Text color={textColor} fontSize="xs">
                  {data.userName}
                </Text>
                <Avatar name={data.userName} size="xs" />
              </HStack>
            </MenuButton>
          </Tooltip>
          <MenuList>
            <MenuItem icon={<FiSettings />} fontSize="sm">
              Ustawienia użytkownika
            </MenuItem>
            <MenuDivider />
            <MenuItem icon={<FiLogOut />} fontSize="sm" color="red.500">
              Wyloguj się
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default TopBar;
