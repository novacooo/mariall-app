import { Flex, Spinner } from '@chakra-ui/react';
import ProductCard from 'components/ProductCard/ProductCard';
import { useGetProductsQuery } from 'graphql/generated/schema';
import { getImageUrl } from 'helpers/getImageUrl';
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
      <Flex
        gap={4}
        wrap="wrap"
        justify={{
          base: 'center',
          md: 'flex-start',
        }}
      >
        {productsData ? (
          productsData.map(({ id, attributes }, index) => {
            if (!id || !attributes) return null;

            const { code, name, price } = attributes;

            return (
              <ProductCard
                key={id}
                name={name}
                code={code}
                price={price}
                active={!!(index % 2)}
                image={getImageUrl(attributes.image?.data?.attributes?.url)}
              />
            );
          })
        ) : (
          <Spinner />
        )}
      </Flex>
    </ProtectedTabTemplate>
  );
};

export default ProductsManagementTab;
