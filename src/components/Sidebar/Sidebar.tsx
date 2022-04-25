import { Flex, useColorModeValue } from '@chakra-ui/react';
import SidebarItem from 'components/SidebarItem/SidebarItem';
import SidebarMenu from 'components/SidebarMenu/SidebarMenu';
import { SidebarGroup } from 'constants/sidebarGroups';
import { useLocation } from 'react-router-dom';
import { routes } from 'routes';
import {
  GROUP_EMPLOYEES,
  GROUP_OTHER,
  GROUP_PRODUCTS,
  GROUP_SALARIES,
} from 'theme/translations';

interface IPanelTab {
  id: string;
  group: SidebarGroup;
  name: string;
  route: string;
  admin: boolean;
}

const groups: SidebarGroup[] = [
  SidebarGroup.PRODUCTS,
  SidebarGroup.SALARIES,
  SidebarGroup.EMPLOYEES,
  SidebarGroup.OTHER,
];

const panelTabs: IPanelTab[] = [
  {
    id: 'panel-tab-01',
    group: SidebarGroup.PRODUCTS,
    name: 'Dodawanie sztuk',
    route: routes.panel,
    admin: false,
  },
  {
    id: 'panel-tab-02',
    group: SidebarGroup.PRODUCTS,
    name: 'Zarządzanie produktami',
    route: routes.panelProductManagement,
    admin: true,
  },
  {
    id: 'panel-tab-03',
    group: SidebarGroup.SALARIES,
    name: 'Wypłaty',
    route: routes.panelSalaries,
    admin: true,
  },
  {
    id: 'panel-tab-04',
    group: SidebarGroup.SALARIES,
    name: 'Drukowanie podsumowań',
    route: routes.panelPrinting,
    admin: true,
  },
  {
    id: 'panel-tab-05',
    group: SidebarGroup.EMPLOYEES,
    name: 'Zarządzanie pracownikami',
    route: routes.panelEmployeesManagement,
    admin: true,
  },
  {
    id: 'panel-tab-06',
    group: SidebarGroup.OTHER,
    name: 'Logi',
    route: routes.panelLogs,
    admin: true,
  },
];

const getGroupName = (group: SidebarGroup) => {
  if (group === SidebarGroup.PRODUCTS) return GROUP_PRODUCTS;
  if (group === SidebarGroup.SALARIES) return GROUP_SALARIES;
  if (group === SidebarGroup.EMPLOYEES) return GROUP_EMPLOYEES;
  return GROUP_OTHER;
};

const Sidebar = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const location = useLocation();

  return (
    <Flex
      direction="column"
      py={5}
      px={3}
      width="250px"
      bgColor={bgColor}
      borderRightWidth={1}
    >
      <Flex direction="column" gap={5}>
        {groups.map((group) => {
          const groupName = getGroupName(group);
          return (
            <SidebarMenu key={groupName} name={groupName}>
              {panelTabs.map((tab) => (
                <>
                  {tab.group === group && (
                    <SidebarItem
                      key={tab.id}
                      active={tab.route === location.pathname}
                      link={tab.route}
                    >
                      {tab.name}
                    </SidebarItem>
                  )}
                </>
              ))}
            </SidebarMenu>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Sidebar;
