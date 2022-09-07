import {
  Avatar,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAppSelector } from 'app';
import { selectUserEmail } from 'features/user/userSlice';
import { useSignOut } from 'hooks';
import { useTranslation } from 'react-i18next';
import { FiChevronDown, FiLogOut, FiSettings } from 'react-icons/fi';

const UserButton = () => {
  const { t } = useTranslation();
  const signOut = useSignOut();
  const userEmail = useAppSelector(selectUserEmail);

  const textColor = useColorModeValue('gray.600', 'gray.300');
  const logoutTextColor = useColorModeValue('red.500', 'red.400');

  const handleSignOutButtonClick = () => {
    void signOut();
  };

  return (
    <Menu>
      <Tooltip label={t('tooltips.showMenu')}>
        <MenuButton as={Button} variant="outline" rightIcon={<FiChevronDown />}>
          <HStack spacing={2}>
            <Text color={textColor} fontSize="xs">
              {userEmail}
            </Text>
            <Avatar name={userEmail} size="xs" />
          </HStack>
        </MenuButton>
      </Tooltip>
      <MenuList>
        <MenuItem icon={<FiSettings />} fontSize="sm">
          {t('buttons.userSettings')}
        </MenuItem>
        <MenuDivider />
        <MenuItem icon={<FiLogOut />} fontSize="sm" color={logoutTextColor} onClick={handleSignOutButtonClick}>
          {t('buttons.signOut')}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserButton;
