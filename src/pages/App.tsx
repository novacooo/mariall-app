/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { routes } from 'routes';
import { Suspense } from 'react';
import { store, persistor } from 'app';
import MainTemplate from 'templates/MainTemplate';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from 'theme';
import PanelPage from './PanelPage';
import MenuPage from './MenuPage';
import LoginPage from './LoginPage';

const App = () => (
  <Suspense fallback="Loading...">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
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
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </Suspense>
);

export default App;
