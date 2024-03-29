import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  Text,
  DrawerOverlay,
  Flex,
  Avatar,
  useColorModeValue,
  Tooltip,
  IconButton,
} from '@chakra-ui/react';
import ColorButton from 'components/ColorButton/ColorButton';
import ColorModeButton from 'components/ColorModeButton/ColorModeButton';
import LanguageButton from 'components/LanguageButton/LanguageButton';
import SidebarTabs from 'components/SidebarTabs/SidebarTabs';
import { useSignOut } from 'hooks';
import { useTranslation } from 'react-i18next';
import { FiLogOut } from 'react-icons/fi';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const data = {
  userName: 'Jacek Nowak',
};

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const { t } = useTranslation();
  const singOut = useSignOut();

  const logoutIconColor = useColorModeValue('red.500', 'red.400');
  const bgColor = useColorModeValue('white', 'gray.800');

  const handleSignOutButtonClick = () => {
    void singOut();
  };

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} autoFocus={false}>
      <DrawerOverlay />
      <DrawerContent bg={bgColor}>
        <DrawerBody px={3} py={6}>
          <Flex minH="100%" direction="column" gap={6}>
            <Flex px={3} align="center" justify="space-between">
              <Flex gap={3} align="center">
                <Avatar name={data.userName} size="sm" />
                <Text fontSize="sm">{data.userName}</Text>
              </Flex>
              <Tooltip label={t('tooltips.signOut')}>
                <IconButton
                  variant="outline"
                  aria-label={t('tooltips.signOut')}
                  color={logoutIconColor}
                  icon={<FiLogOut />}
                  onClick={handleSignOutButtonClick}
                />
              </Tooltip>
            </Flex>
            <Divider mx={3} w="auto" />
            <Flex direction="column" flexGrow={1}>
              <SidebarTabs />
            </Flex>
            <Divider mx={3} w="auto" />
            <Flex gap={3} justify="center">
              <LanguageButton />
              <ColorButton />
              <ColorModeButton />
            </Flex>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileSidebar;
