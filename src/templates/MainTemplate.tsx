/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Flex, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { selectUserJwtToken } from 'features/user/userSlice';
import { useAppSelector } from 'hooks';
import { createUploadLink } from 'apollo-upload-client';

interface MainTemplateProps {
  children: ReactNode;
}

const MainTemplate = ({ children }: MainTemplateProps) => {
  const userJwtToken = useAppSelector(selectUserJwtToken);
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  const uploadLink = createUploadLink({
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
    link: authLink.concat(uploadLink),
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
      <Flex direction="column" minHeight="100%" bgColor={bgColor}>
        {children}
      </Flex>
    </ApolloProvider>
  );
};

export default MainTemplate;
