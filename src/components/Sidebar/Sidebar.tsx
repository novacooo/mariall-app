import { Flex, useColorModeValue } from '@chakra-ui/react';
import SidebarItem from 'components/SidebarItem/SidebarItem';
import SidebarMenu from 'components/SidebarMenu/SidebarMenu';
import { MENU } from 'theme/translations';

const tabs = [
  'Zarządzanie pracownikami',
  'Zarządzanie produktami',
  'Aktualne wypłaty',
  'Drukowanie',
  'Logi',
];

const Sidebar = () => {
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Flex
      direction="column"
      py={5}
      px={3}
      width="250px"
      flexGrow={1}
      bgColor={bgColor}
      borderRightWidth={1}
    >
      <Flex direction="column" gap={5}>
        <SidebarMenu name={MENU}>
          {tabs.map((tab, i) => (
            <SidebarItem active={i === 1}>{tab}</SidebarItem>
          ))}
        </SidebarMenu>
        <SidebarMenu name="Testowe menu">
          {tabs.map((tab) => (
            <SidebarItem>{tab}</SidebarItem>
          ))}
        </SidebarMenu>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
