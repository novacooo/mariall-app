import { Flex, Image, Spinner, Text } from '@chakra-ui/react';
import { useGetProductsQuery } from 'graphql/generated/schema';
import { useErrorToast } from 'hooks';
import ProtectedTabTemplate from 'templates/ProtectedTabTemplate';

const ProductsManagementTab = () => {
  const errorToast = useErrorToast();

  const { data: getProductsData } = useGetProductsQuery({
    onError: (error) => {
      errorToast(error);
    },
  });

  const productsData = getProductsData?.products?.data;

  return (
    <ProtectedTabTemplate>
      <div>
        {productsData ? (
          productsData.map((product) => (
            <Flex gap={4} align="center" key={product.id}>
              <Image
                w={20}
                h={20}
                rounded="md"
                borderWidth={1}
                borderStyle="solid"
                src="https://placekitten.com/200/200"
              />
              <Flex direction="column">
                <Text fontSize="sm" fontWeight="medium" color="gray.500" textTransform="uppercase">
                  Code
                </Text>
                <Text fontSize="lg">Product name</Text>
              </Flex>
            </Flex>
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </ProtectedTabTemplate>
  );
};

export default ProductsManagementTab;
