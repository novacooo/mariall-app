import { Flex, Spinner, useDisclosure } from '@chakra-ui/react';
import ProductCard from 'components/ProductCard/ProductCard';
import ProductDrawer from 'components/ProductDrawer/ProductDrawer';
import { useGetProductsQuery } from 'graphql/generated/schema';
import { getImageUrl } from 'helpers/getImageUrl';
import { useErrorToast } from 'hooks';
import ProtectedTabTemplate from 'templates/ProtectedTabTemplate';

const ProductsManagementTab = () => {
  const errorToast = useErrorToast();
  const { isOpen: isProductDrawerOpen, onOpen: productDrawerOnOpen, onClose: productDrawerOnClose } = useDisclosure();

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
          productsData.map(({ id, attributes }) => {
            if (!id || !attributes) return null;

            const { code, name, price, active } = attributes;

            return (
              <ProductCard
                key={id}
                name={name}
                code={code}
                price={price}
                active={active}
                image={getImageUrl(attributes.image?.data?.attributes?.url)}
                onClick={productDrawerOnOpen}
              />
            );
          })
        ) : (
          <Spinner />
        )}
      </Flex>
      <ProductDrawer isOpen={isProductDrawerOpen} onClose={productDrawerOnClose} />
    </ProtectedTabTemplate>
  );
};

export default ProductsManagementTab;
