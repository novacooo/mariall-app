/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Flex, useColorModeValue } from '@chakra-ui/react';
import ColorContextProvider from 'contexts/ColorContext';
import { ReactNode } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAppSelector } from 'app';
import { selectUserJwtToken } from 'features/user/userSlice';

interface MainTemplateProps {
  children: ReactNode;
}

const MainTemplate = ({ children }: MainTemplateProps) => {
  const userJwtToken = useAppSelector(selectUserJwtToken);
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: userJwtToken ? `Bearer ${userJwtToken}` : '',
      },
    };
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  });

  return (
    <ApolloProvider client={apolloClient}>
      <ColorContextProvider>
        <Flex direction="column" minHeight="100%" bgColor={bgColor}>
          {children}
        </Flex>
      </ColorContextProvider>
    </ApolloProvider>
  );
};

export default MainTemplate;
