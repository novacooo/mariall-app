import { Flex, Spinner, useDisclosure } from '@chakra-ui/react';
import ProductCard from 'components/ProductCard/ProductCard';
import ProductDrawer, { IDrawerProduct } from 'components/ProductDrawer/ProductDrawer';
import { useGetProductsQuery } from 'graphql/generated/schema';
import { getImageUrl } from 'helpers/getImageUrl';
import { useErrorToast } from 'hooks';
import { useState } from 'react';
import ProtectedTabTemplate from 'templates/ProtectedTabTemplate';

const ProductsManagementTab = () => {
  const errorToast = useErrorToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [product, setProduct] = useState<IDrawerProduct>();

  const { data: getProductsData } = useGetProductsQuery({
    onError: (error) => {
      errorToast(error);
    },
  });

  const productsData = getProductsData?.products?.data;

  const handleDrawerOpen = (productItem: IDrawerProduct) => {
    setProduct(productItem);
    onOpen();
  };

  const handleDrawerClose = () => {
    setProduct(undefined);
    onClose();
  };

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

            const productItem: IDrawerProduct = { id, code, name, price, active };

            return (
              <ProductCard
                key={id}
                name={name}
                code={code}
                price={price}
                active={active}
                image={getImageUrl(attributes.image?.data?.attributes?.url)}
                onClick={() => handleDrawerOpen(productItem)}
              />
            );
          })
        ) : (
          <Spinner />
        )}
      </Flex>
      <ProductDrawer product={product} isOpen={isOpen} onClose={handleDrawerClose} />
    </ProtectedTabTemplate>
  );
};

export default ProductsManagementTab;
