import { Heading, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { routes } from 'routes';

const MenuPage = () => (
  <VStack>
    <Heading>menu page</Heading>
    <Link to={routes.panel}>panel</Link>
    <Link to={routes.login}>login</Link>
  </VStack>
);

export default MenuPage;
