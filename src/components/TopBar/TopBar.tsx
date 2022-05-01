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
  FiChevronDown,
  FiGrid,
  FiMenu,
} from 'react-icons/fi';
import { ReactComponent as LogoLight } from 'assets/logo_light.svg';
import { ReactComponent as LogoDark } from 'assets/logo_dark.svg';
import { useNavigate } from 'react-router-dom';
import { routes } from 'routes';
import { useTranslation } from 'react-i18next';
import LanguageButton from 'components/LanguageButton/LanguageButton';
import ColorButton from 'components/ColorButton/ColorButton';
import ColorModeButton from 'components/ColorModeButton/ColorModeButton';

const data = {
  userName: 'Jacek Nowak',
};

const TopBar = () => {
  const { t } = useTranslation();

  const { colorMode } = useColorMode();

  const navigate = useNavigate();

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const logoutTextColor = useColorModeValue('red.500', 'red.400');

  const logoHeight = 36;

  return (
    <Flex
      position="relative"
      px={6}
      py={3}
      justify={{
        base: 'center',
        md: 'space-between',
      }}
      align="center"
      bgColor={bgColor}
      borderBottomWidth={1}
    >
      <Tooltip label={t('tooltips.showMenu')}>
        <IconButton
          position="absolute"
          left={4}
          display={{
            base: 'inline-flex',
            md: 'none',
          }}
          variant="outline"
          aria-label={t('tooltips.showMenu')}
          icon={<FiMenu />}
        />
      </Tooltip>
      <Tooltip label={t('tooltips.signOut')}>
        <IconButton
          position="absolute"
          right={4}
          display={{
            base: 'inline-flex',
            md: 'none',
          }}
          variant="outline"
          aria-label={t('tooltips.signOut')}
          icon={<FiLogOut />}
        />
      </Tooltip>
      <HStack
        spacing={5}
        divider={
          <StackDivider
            display={{
              base: 'none',
              md: 'flex',
            }}
          />
        }
      >
        {colorMode === 'light' ? (
          <LogoLight height={logoHeight} />
        ) : (
          <LogoDark height={logoHeight} />
        )}
        <HStack
          spacing={5}
          display={{
            base: 'none',
            md: 'flex',
          }}
        >
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
      <HStack
        spacing={3}
        display={{
          base: 'none',
          md: 'flex',
        }}
      >
        <LanguageButton />
        <ColorButton />
        <ColorModeButton />
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
              {t('buttons.signOut')}
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default TopBar;
