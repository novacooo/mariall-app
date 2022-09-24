import { Flex } from '@chakra-ui/react';
import { SidebarGroup, SidebarTab } from 'constants/sidebar';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { routes } from 'routes';
import SidebarItem from 'components/SidebarItem/SidebarItem';
import SidebarMenu from 'components/SidebarMenu/SidebarMenu';
import { useAppSelector } from 'app';
import { selectUserRole } from 'features/user/userSlice';
import { UserRole } from 'constants/UserRole';

interface IPanelTab {
  id: string;
  groupId: SidebarGroup;
  tabId: SidebarTab;
  route: string;
  admin: boolean;
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
    admin: false,
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

const SidebarTabs = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const userRole = useAppSelector(selectUserRole);

  const getGroupName = (groupId: SidebarGroup) => {
    if (groupId === SidebarGroup.PRODUCTS) return t('sidebar.groups.products');
    if (groupId === SidebarGroup.SALARIES) return t('sidebar.groups.salaries');
    if (groupId === SidebarGroup.EMPLOYEES) return t('sidebar.groups.employees');
    if (groupId === SidebarGroup.OTHER) return t('sidebar.groups.other');

    return null;
  };

  const getTabName = (tabId: SidebarTab) => {
    if (tabId === SidebarTab.ADDING_QUANTITY) return t('sidebar.tabs.addingQuantity');
    if (tabId === SidebarTab.PRODUCTS_MANAGEMENT) return t('sidebar.tabs.productsManagement');
    if (tabId === SidebarTab.SALARIES) return t('sidebar.tabs.salaries');
    if (tabId === SidebarTab.PRINTING_SUMMARIES) return t('sidebar.tabs.printingSummaries');
    if (tabId === SidebarTab.EMPLOYEES_MANAGEMENT) return t('sidebar.tabs.employeesManagement');
    if (tabId === SidebarTab.LOGS) return t('sidebar.tabs.logs');

    return null;
  };

  const checkAdmin = (isAdmin: boolean) => {
    if (!isAdmin) return true;
    return userRole === UserRole.AUTHENTICATED || userRole === UserRole.ADMINISTRATOR;
  };

  return (
    <Flex direction="column" gap={5}>
      {groups.map((group) => {
        const groupName = getGroupName(group);
        if (!groupName) return null;

        return (
          <SidebarMenu key={groupName} name={groupName}>
            {tabs.map(({ id, tabId, route, groupId, admin }) => {
              const tabName = getTabName(tabId);

              if (!tabName) return null;

              if (groupId === group && checkAdmin(admin)) {
                return (
                  <SidebarItem key={id} active={`${routes.panel}/${route}` === location.pathname} link={route}>
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
  );
};

export default SidebarTabs;
