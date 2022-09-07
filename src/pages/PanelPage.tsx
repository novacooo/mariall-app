import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { routes } from 'routes';
import AddingQuantityTab from 'tabs/AddingQuantityTab';
import EmployeesManagementTab from 'tabs/EmployeesManagementTab';
import LogsTab from 'tabs/LogsTab';
import PrintingSummariesTab from 'tabs/PrintingSummariesTab';
import ProductsManagementTab from 'tabs/ProductsManagementTab';
import SalariesTab from 'tabs/SalariesTab';
import AuthenticatedPageTemplate from 'templates/AuthenticatedPageTemplate';
import PanelTemplate from 'templates/PanelTemplate';

const PanelPage = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const getPanelTitle = () => {
    switch (pathname) {
      case `${routes.panel}/${routes.panelAddingQuantity}`:
        return t('sidebar.tabs.addingQuantity');
      case `${routes.panel}/${routes.panelProductsManagement}`:
        return t('sidebar.tabs.productsManagement');
      case `${routes.panel}/${routes.panelSalaries}`:
        return t('sidebar.tabs.salaries');
      case `${routes.panel}/${routes.panelPrinting}`:
        return t('sidebar.tabs.printingSummaries');
      case `${routes.panel}/${routes.panelEmployeesManagement}`:
        return t('sidebar.tabs.employeesManagement');
      case `${routes.panel}/${routes.panelLogs}`:
        return t('sidebar.tabs.logs');
      default:
        return '';
    }
  };

  const panelTitle = getPanelTitle();

  return (
    <AuthenticatedPageTemplate>
      <PanelTemplate name={panelTitle}>
        {pathname === routes.panel && <Navigate to={routes.panelAddingQuantity} />}
        <Routes>
          <Route path={routes.panelAddingQuantity} element={<AddingQuantityTab />} />
          <Route path={routes.panelProductsManagement} element={<ProductsManagementTab />} />
          <Route path={routes.panelSalaries} element={<SalariesTab />} />
          <Route path={routes.panelPrinting} element={<PrintingSummariesTab />} />
          <Route path={routes.panelEmployeesManagement} element={<EmployeesManagementTab />} />
          <Route path={routes.panelLogs} element={<LogsTab />} />
        </Routes>
      </PanelTemplate>
    </AuthenticatedPageTemplate>
  );
};

export default PanelPage;
