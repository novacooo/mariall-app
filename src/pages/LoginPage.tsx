import { Heading, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { routes } from 'routes';

const LoginPage = () => (
  <VStack>
    <Heading>login page</Heading>
    <Link to={routes.menu}>menu</Link>
  </VStack>
);

export default LoginPage;
