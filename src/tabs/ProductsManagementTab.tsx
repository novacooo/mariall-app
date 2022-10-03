import { Flex, Image, Text } from '@chakra-ui/react';
import ProtectedTabTemplate from 'templates/ProtectedTabTemplate';

const ProductsManagementTab = () => (
  <ProtectedTabTemplate>
    <Flex gap={4} align="center">
      <Image w={20} h={20} rounded="md" borderWidth={1} borderStyle="solid" src="https://placekitten.com/200/200" />
      <Flex direction="column">
        <Text fontSize="sm" fontWeight="medium" color="gray.500" textTransform="uppercase">
          Code
        </Text>
        <Text fontSize="lg">Product name</Text>
      </Flex>
    </Flex>
  </ProtectedTabTemplate>
);

export default ProductsManagementTab;
