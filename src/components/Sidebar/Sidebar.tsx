import { Flex, useColorModeValue } from '@chakra-ui/react';
import SidebarItem from 'components/SidebarItem/SidebarItem';
import SidebarMenu from 'components/SidebarMenu/SidebarMenu';

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
      <SidebarMenu>
        {tabs.map((tab, i) => (
          <SidebarItem active={i === 2}>{tab}</SidebarItem>
        ))}
      </SidebarMenu>
    </Flex>
  );
};

export default Sidebar;
