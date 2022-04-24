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
import {
  FiLogOut,
  FiSettings,
  FiSun,
  FiMoon,
  FiChevronDown,
} from 'react-icons/fi';
import { BiPalette } from 'react-icons/bi';
import { ReactComponent as LogoLight } from 'assets/logo_light.svg';
import { ReactComponent as LogoDark } from 'assets/logo_dark.svg';
import {
  BUTTON_LOGOUT,
  BUTTON_USER_SETTINGS,
  PRODUCTION_APP_TITLE,
  SHOW_MENU,
  TOOLTIP_TOGGLE_COLOR,
  TOOLTIP_TOGGLE_THEME,
} from 'theme/translations';

const data = {
  userName: 'Jacek Nowak',
};

const TopBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const logoutTextColor = useColorModeValue('red.500', 'red.400');

  const logoHeight = 36;

  return (
    <Flex
      px={6}
      py={3}
      justify="space-between"
      align="center"
      bgColor={bgColor}
      borderBottomWidth={1}
    >
      <HStack spacing={5} divider={<StackDivider />}>
        {colorMode === 'light' ? (
          <LogoLight height={logoHeight} />
        ) : (
          <LogoDark height={logoHeight} />
        )}
        <Text color={textColor}>{PRODUCTION_APP_TITLE}</Text>
      </HStack>
      <HStack spacing={3}>
        <Tooltip label={TOOLTIP_TOGGLE_COLOR}>
          <IconButton
            variant="outline"
            aria-label={TOOLTIP_TOGGLE_COLOR}
            icon={<BiPalette />}
          />
        </Tooltip>
        <Tooltip label={TOOLTIP_TOGGLE_THEME}>
          <IconButton
            onClick={toggleColorMode}
            variant="outline"
            aria-label={TOOLTIP_TOGGLE_THEME}
            icon={colorMode === 'light' ? <FiSun /> : <FiMoon />}
          />
        </Tooltip>
        <Menu size="xs">
          <Tooltip label={SHOW_MENU}>
            <MenuButton
              as={Button}
              variant="outline"
              rightIcon={<FiChevronDown />}
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
              {BUTTON_USER_SETTINGS}
            </MenuItem>
            <MenuDivider />
            <MenuItem icon={<FiLogOut />} fontSize="sm" color={logoutTextColor}>
              {BUTTON_LOGOUT}
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default TopBar;
