import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
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
  FiGrid,
} from 'react-icons/fi';
import { BiPalette } from 'react-icons/bi';
import { ReactComponent as LogoLight } from 'assets/logo_light.svg';
import { ReactComponent as LogoDark } from 'assets/logo_dark.svg';
import {
  BUTTON_LOGOUT,
  BUTTON_USER_SETTINGS,
  PRODUCTION_APP_TITLE,
  SHOW_MENU,
  TOOLTIP_CHANGE_APP,
  TOOLTIP_TOGGLE_COLOR,
  TOOLTIP_TOGGLE_THEME,
} from 'theme/translations';
import { AccentColorType, useColorContext } from 'contexts/ColorContext';
import { useNavigate } from 'react-router-dom';
import { routes } from 'routes';

const data = {
  userName: 'Jacek Nowak',
};

const colors: AccentColorType[] = [
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
];

const TopBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { accentColor, changeAccentColor } = useColorContext();

  const navigate = useNavigate();

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
        <HStack spacing={5}>
          <Text
            fontSize="xs"
            color={textColor}
            textTransform="uppercase"
            fontWeight="medium"
            letterSpacing="wider"
          >
            {PRODUCTION_APP_TITLE}
          </Text>
          <Tooltip label={TOOLTIP_CHANGE_APP}>
            <IconButton
              variant="outline"
              aria-label={TOOLTIP_CHANGE_APP}
              icon={<FiGrid />}
            />
          </Tooltip>
        </HStack>
      </HStack>
      <HStack spacing={3}>
        <Menu closeOnSelect={false}>
          <Tooltip label={TOOLTIP_TOGGLE_COLOR}>
            <MenuButton
              as={IconButton}
              variant="outline"
              aria-label={TOOLTIP_TOGGLE_COLOR}
              icon={<BiPalette />}
            />
          </Tooltip>
          <MenuList>
            <MenuOptionGroup defaultValue={accentColor} type="radio">
              {colors.map((color) => (
                <MenuItemOption
                  value={color}
                  fontSize="sm"
                  textTransform="capitalize"
                  onClick={() => changeAccentColor(color)}
                >
                  <HStack>
                    <Box
                      width={3}
                      height={3}
                      rounded="full"
                      bgColor={`${color}.400`}
                    />
                    <Text>{color}</Text>
                  </HStack>
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        <Tooltip label={TOOLTIP_TOGGLE_THEME}>
          <IconButton
            onClick={toggleColorMode}
            variant="outline"
            aria-label={TOOLTIP_TOGGLE_THEME}
            icon={colorMode === 'light' ? <FiSun /> : <FiMoon />}
          />
        </Tooltip>
        <Menu>
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
            <MenuItem
              icon={<FiLogOut />}
              fontSize="sm"
              color={logoutTextColor}
              onClick={() => navigate(routes.login)}
            >
              {BUTTON_LOGOUT}
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default TopBar;
