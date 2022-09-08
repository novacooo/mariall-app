import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { routes } from 'routes';
import { Suspense } from 'react';
import { store } from 'app';
import MainTemplate from 'templates/MainTemplate';
import { Provider } from 'react-redux';
import PanelPage from './PanelPage';
import MenuPage from './MenuPage';
import LoginPage from './LoginPage';

const App = () => (
  <Suspense fallback="loading">
    <Provider store={store}>
      <HashRouter basename="/">
        <MainTemplate>
          <Routes>
            <Route path={routes.menu} element={<MenuPage />} />
            <Route path={routes.login} element={<LoginPage />} />
            <Route path={`${routes.panel}/*`} element={<PanelPage />} />
            <Route path="*" element={<Navigate to={routes.menu} replace />} />
          </Routes>
        </MainTemplate>
      </HashRouter>
    </Provider>
  </Suspense>
);

export default App;
