/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from 'theme/theme';
import { routes } from 'routes';
import { Suspense } from 'react';
import MainTemplate from 'templates/MainTemplate';
import PanelPage from './PanelPage';
import MenuPage from './MenuPage';
import LoginPage from './LoginPage';

const App = () => (
  <Suspense fallback="loading">
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <HashRouter basename="/">
        <MainTemplate>
          <Routes>
            <Route path={routes.menu} element={<MenuPage />} />
            <Route path={routes.login} element={<LoginPage />} />
            <Route path={`${routes.panel}/*`} element={<PanelPage />} />
          </Routes>
        </MainTemplate>
      </HashRouter>
    </ChakraProvider>
  </Suspense>
);

export default App;
