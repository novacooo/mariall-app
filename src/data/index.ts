/* eslint-disable import/prefer-default-export */
import { SidebarGroup } from 'constants/sidebarGroups';
import { routes } from 'routes';

interface IPanelTab {
  id: string;
  group: SidebarGroup;
  name: string;
  route: string;
  admin: boolean;
}

interface IData {
  panelTabs: IPanelTab[];
}

export const data: IData = {
  panelTabs: [
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
  ],
};
