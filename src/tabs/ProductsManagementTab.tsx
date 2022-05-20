import { Flex, Image, Text } from '@chakra-ui/react';

const ProductsManagementTab = () => (
  <Flex gap={4} align="center">
    <Image
      w={20}
      h={20}
      rounded="md"
      borderWidth={1}
      borderStyle="solid"
      src="https://placekitten.com/200/200"
    />
    <Flex direction="column">
      <Text
        fontSize="sm"
        fontWeight="medium"
        color="gray.500"
        textTransform="uppercase"
      >
        Code
      </Text>
      <Text fontSize="lg">Product name</Text>
    </Flex>
  </Flex>
);

export default ProductsManagementTab;
