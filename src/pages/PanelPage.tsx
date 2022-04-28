import { useTranslation } from 'react-i18next';
import { Route, Routes, useLocation } from 'react-router-dom';
import { routes } from 'routes';
import AddingQuantityTab from 'tabs/AddingQuantityTab';
import EmployeesManagementTab from 'tabs/EmployeesManagementTab';
import LogsTab from 'tabs/LogsTab';
import PrintingSummariesTab from 'tabs/PrintingSummariesTab';
import ProductsManagementTab from 'tabs/ProductsManagementTab';
import SalariesTab from 'tabs/SalariesTab';
import PanelTemplate from 'templates/PanelTemplate';

const PanelPage = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const getPanelTitle = () => {
    switch (pathname) {
      case routes.panel:
        return t('sidebar.tabs.addingQuantity');
      case routes.panelProductsManagement:
        return t('sidebar.tabs.productsManagement');
      case routes.panelSalaries:
        return t('sidebar.tabs.salaries');
      case routes.panelPrinting:
        return t('sidebar.tabs.printingSummaries');
      case routes.panelEmployeesManagement:
        return t('sidebar.tabs.employeesManagement');
      case routes.panelLogs:
        return t('sidebar.tabs.logs');
      default:
        return '';
    }
  };

  const panelTitle = getPanelTitle();

  return (
    <PanelTemplate name={panelTitle}>
      <Routes>
        <Route path={routes.panel} element={<AddingQuantityTab />} />
        <Route
          path={routes.panelProductsManagement}
          element={<ProductsManagementTab />}
        />
        <Route path={routes.panelSalaries} element={<SalariesTab />} />
        <Route path={routes.panelPrinting} element={<PrintingSummariesTab />} />
        <Route
          path={routes.panelEmployeesManagement}
          element={<EmployeesManagementTab />}
        />
        <Route path={routes.panelLogs} element={<LogsTab />} />
      </Routes>
    </PanelTemplate>
  );
};

export default PanelPage;
