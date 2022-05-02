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
import { useTranslation } from 'react-i18next';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { routes } from 'routes';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const data = {
  userName: 'Jacek Nowak',
};

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const logoutIconColor = useColorModeValue('red.500', 'red.400');
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      autoFocus={false}
    >
      <DrawerOverlay />
      <DrawerContent bg={bgColor}>
        <DrawerBody px={3} py={6}>
          <Flex minH="100%" direction="column" gap={6}>
            <Flex px={3} align="center" justify="space-between">
              <Flex gap={4} align="center">
                <Avatar name={data.userName} size="md" />
                <Text fontSize="lg">{data.userName}</Text>
              </Flex>
              <Tooltip label={t('tooltips.signOut')}>
                <IconButton
                  variant="outline"
                  aria-label={t('tooltips.signOut')}
                  color={logoutIconColor}
                  icon={<FiLogOut />}
                  onClick={() => navigate(routes.login)}
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
