/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { theme } from 'theme';
import { routes } from 'routes';
import { Suspense } from 'react';
import { store } from 'app';
import MainTemplate from 'templates/MainTemplate';
import { Provider } from 'react-redux';
import PanelPage from './PanelPage';
import MenuPage from './MenuPage';
import LoginPage from './LoginPage';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  const jwtToken = localStorage.getItem('jwtToken');
  return {
    headers: {
      ...headers,
      authorization: jwtToken ? `Bearer ${jwtToken}` : '',
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => (
  <Suspense fallback="loading">
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
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
      </ApolloProvider>
    </Provider>
  </Suspense>
);

export default App;
