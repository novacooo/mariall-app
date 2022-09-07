/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import theme from 'theme/theme';
import { routes } from 'routes';
import { Suspense } from 'react';
import { store } from 'app/store';
import MainTemplate from 'templates/MainTemplate';
import { Provider } from 'react-redux';
import PanelPage from './PanelPage';
import MenuPage from './MenuPage';
import LoginPage from './LoginPage';

const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

const App = () => (
  <Suspense fallback="loading">
    <ApolloProvider client={apolloClient}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
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
      </ChakraProvider>
    </ApolloProvider>
  </Suspense>
);

export default App;
