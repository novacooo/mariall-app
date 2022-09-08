import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { routes } from 'routes';
import { Suspense } from 'react';
import { store, persistor } from 'app';
import MainTemplate from 'templates/MainTemplate';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import PanelPage from './PanelPage';
import MenuPage from './MenuPage';
import LoginPage from './LoginPage';

const App = () => (
  <Suspense fallback="loading">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  </Suspense>
);

export default App;
