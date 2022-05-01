import { Flex, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import SidebarItem from 'components/SidebarItem/SidebarItem';
import SidebarMenu from 'components/SidebarMenu/SidebarMenu';
import { SidebarGroup, SidebarTab } from 'constants/sidebar';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { routes } from 'routes';

interface IPanelTab {
  id: string;
  groupId: SidebarGroup;
  tabId: SidebarTab;
  route: string;
  admin: boolean;
}

interface SidebarProps {
  width: number;
  showAlways?: boolean;
}

const groups: SidebarGroup[] = [
  SidebarGroup.PRODUCTS,
  SidebarGroup.SALARIES,
  SidebarGroup.EMPLOYEES,
  SidebarGroup.OTHER,
];

const tabs: IPanelTab[] = [
  {
    id: 'panel-tab-01',
    groupId: SidebarGroup.PRODUCTS,
    tabId: SidebarTab.ADDING_QUANTITY,
    route: routes.panelAddingQuantity,
    admin: false,
  },
  {
    id: 'panel-tab-02',
    groupId: SidebarGroup.PRODUCTS,
    tabId: SidebarTab.PRODUCTS_MANAGEMENT,
    route: routes.panelProductsManagement,
    admin: true,
  },
  {
    id: 'panel-tab-03',
    groupId: SidebarGroup.SALARIES,
    tabId: SidebarTab.SALARIES,
    route: routes.panelSalaries,
    admin: true,
  },
  {
    id: 'panel-tab-04',
    groupId: SidebarGroup.SALARIES,
    tabId: SidebarTab.PRINTING_SUMMARIES,
    route: routes.panelPrinting,
    admin: true,
  },
  {
    id: 'panel-tab-05',
    groupId: SidebarGroup.EMPLOYEES,
    tabId: SidebarTab.EMPLOYEES_MANAGEMENT,
    route: routes.panelEmployeesManagement,
    admin: true,
  },
  {
    id: 'panel-tab-06',
    groupId: SidebarGroup.OTHER,
    tabId: SidebarTab.LOGS,
    route: routes.panelLogs,
    admin: true,
  },
];

const Sidebar = ({ showAlways = false, width }: SidebarProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const location = useLocation();
  const { t } = useTranslation();
  const sidebarDisplay = useBreakpointValue({
    base: 'none',
    md: 'flex',
  });

  const getGroupName = (groupId: SidebarGroup) => {
    if (groupId === SidebarGroup.PRODUCTS) return t('sidebar.groups.products');
    if (groupId === SidebarGroup.SALARIES) return t('sidebar.groups.salaries');
    if (groupId === SidebarGroup.EMPLOYEES)
      return t('sidebar.groups.employees');
    if (groupId === SidebarGroup.OTHER) return t('sidebar.groups.other');

    return null;
  };

  const getTabName = (tabId: SidebarTab) => {
    if (tabId === SidebarTab.ADDING_QUANTITY)
      return t('sidebar.tabs.addingQuantity');
    if (tabId === SidebarTab.PRODUCTS_MANAGEMENT)
      return t('sidebar.tabs.productsManagement');
    if (tabId === SidebarTab.SALARIES) return t('sidebar.tabs.salaries');
    if (tabId === SidebarTab.PRINTING_SUMMARIES)
      return t('sidebar.tabs.printingSummaries');
    if (tabId === SidebarTab.EMPLOYEES_MANAGEMENT)
      return t('sidebar.tabs.employeesManagement');
    if (tabId === SidebarTab.LOGS) return t('sidebar.tabs.logs');

    return null;
  };

  return (
    <Flex
      display={showAlways ? 'flex' : sidebarDisplay}
      direction="column"
      py={5}
      px={3}
      width={`${width}px`}
      bgColor={bgColor}
      borderRightWidth={1}
    >
      <Flex direction="column" gap={5}>
        {groups.map((group) => {
          const groupName = getGroupName(group);
          if (!groupName) return null;

          return (
            <SidebarMenu key={groupName} name={groupName}>
              {tabs.map((tab) => {
                const tabName = getTabName(tab.tabId);
                if (!tabName) return null;
                if (tab.groupId === group) {
                  return (
                    <SidebarItem
                      key={tab.id}
                      active={
                        `${routes.panel}/${tab.route}` === location.pathname
                      }
                      link={tab.route}
                    >
                      {tabName}
                    </SidebarItem>
                  );
                }
                return null;
              })}
            </SidebarMenu>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Sidebar;
