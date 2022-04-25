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
  FiGlobe,
} from 'react-icons/fi';
import { BiPalette } from 'react-icons/bi';
import { ReactComponent as LogoLight } from 'assets/logo_light.svg';
import { ReactComponent as LogoDark } from 'assets/logo_dark.svg';
import { AccentColorType, useColorContext } from 'contexts/ColorContext';
import { useNavigate } from 'react-router-dom';
import { routes } from 'routes';
import { useTranslation } from 'react-i18next';
import { Languages } from 'constants/languages';

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
  const { t, i18n } = useTranslation();

  const { colorMode, toggleColorMode } = useColorMode();
  const { accentColor, changeAccentColor } = useColorContext();

  const navigate = useNavigate();

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const logoutTextColor = useColorModeValue('red.500', 'red.400');

  const logoHeight = 36;

  const changeLanguage = (language: Languages) => {
    i18n.changeLanguage(language);
  };

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
            {t('appNames.productionManagement')}
          </Text>
          <Tooltip label={t('tooltips.changeApp')}>
            <IconButton
              variant="outline"
              aria-label={t('tooltips.changeApp')}
              icon={<FiGrid />}
              onClick={() => navigate(routes.menu)}
            />
          </Tooltip>
        </HStack>
      </HStack>
      <HStack spacing={3}>
        <Menu closeOnSelect={false}>
          <Tooltip label={t('tooltips.changeLanguage')}>
            <MenuButton
              as={IconButton}
              variant="outline"
              aria-label={t('tooltips.changeLanguage')}
              icon={<FiGlobe />}
            />
          </Tooltip>
          <MenuList>
            <MenuOptionGroup defaultValue={i18n.language} type="radio">
              <MenuItemOption
                value={Languages.ENGLISH}
                fontSize="sm"
                textTransform="capitalize"
                onClick={() => changeLanguage(Languages.ENGLISH)}
              >
                {t('languages.english')}
              </MenuItemOption>
              <MenuItemOption
                value={Languages.POLISH}
                fontSize="sm"
                textTransform="capitalize"
                onClick={() => changeLanguage(Languages.POLISH)}
              >
                {t('languages.polish')}
              </MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        <Menu closeOnSelect={false}>
          <Tooltip label={t('tooltips.changeColor')}>
            <MenuButton
              as={IconButton}
              variant="outline"
              aria-label={t('tooltips.changeColor')}
              icon={<BiPalette />}
            />
          </Tooltip>
          <MenuList>
            <MenuOptionGroup defaultValue={accentColor} type="radio">
              {colors.map((color) => (
                <MenuItemOption
                  key={color}
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
        <Tooltip label={t('tooltips.toggleTheme')}>
          <IconButton
            onClick={toggleColorMode}
            variant="outline"
            aria-label={t('tooltips.toggleTheme')}
            icon={colorMode === 'light' ? <FiSun /> : <FiMoon />}
          />
        </Tooltip>
        <Menu>
          <Tooltip label={t('tooltips.showMenu')}>
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
              {t('buttons.userSettings')}
            </MenuItem>
            <MenuDivider />
            <MenuItem
              icon={<FiLogOut />}
              fontSize="sm"
              color={logoutTextColor}
              onClick={() => navigate(routes.login)}
            >
              {t('buttons.logOut')}
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default TopBar;
