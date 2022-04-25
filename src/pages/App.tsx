import { HashRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from 'theme/theme';
import { routes } from 'routes';
import PanelPage from './PanelPage';
import MenuPage from './MenuPage';
import LoginPage from './LoginPage';

const App = () => (
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <HashRouter basename="/">
        <Routes>
          <Route path={routes.menu} element={<MenuPage />} />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.panel} element={<PanelPage />} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  </>
);

export default App;
