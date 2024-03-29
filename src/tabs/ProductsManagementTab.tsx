import { Flex, Spinner, useDisclosure } from '@chakra-ui/react';
import AddProductCard from 'components/AddProductCard/AddProductCard';
import AddProductDrawer from 'components/AddProductDrawer/AddProductDrawer';
import ProductCard from 'components/ProductCard/ProductCard';
import ProductDrawer, { IDrawerProduct } from 'components/ProductDrawer/ProductDrawer';
import { useGetProductsQuery } from 'graphql/generated/schema';
import { getErrorMessage, getImageUrl } from 'helpers';
import { useErrorToast } from 'hooks';
import { useLogger } from 'hooks/useLogger';
import { useState } from 'react';
import ProtectedTabTemplate from 'templates/ProtectedTabTemplate';

const ProductsManagementTab = () => {
  const errorToast = useErrorToast();
  const { isOpen: isProductDrawerOpen, onOpen: onProductDrawerOpen, onClose: onProductDrawerClose } = useDisclosure();
  const {
    isOpen: isAddProductDrawerOpen,
    onOpen: onAddProductDrawerOpen,
    onClose: onAddProductDrawerClose,
  } = useDisclosure();
  const logger = useLogger();

  const [product, setProduct] = useState<IDrawerProduct>();

  const { data: getProductsData } = useGetProductsQuery({
    onCompleted: () => {
      logger.sendInfoLog(`Pobrano produkty.`);
    },
    onError: (error) => {
      errorToast(error);
      logger.sendErrorLog(`Nie udało się pobrać produktów. Error: ${getErrorMessage(error)}`);
    },
  });

  const productsData = getProductsData?.products?.data;

  const handleAddProductDrawerClose = () => {
    onAddProductDrawerClose();
  };

  const handleProductDrawerOpen = (productItem: IDrawerProduct) => {
    setProduct(productItem);
    onProductDrawerOpen();
  };

  const handleProductDrawerClose = () => {
    setProduct(undefined);
    onProductDrawerClose();
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
          <>
            {productsData.map(({ id, attributes }) => {
              if (!id || !attributes) return null;

              const { code, name, price, active, image } = attributes;
              const imageUrl = getImageUrl(image?.data?.attributes?.url);
              const productItem: IDrawerProduct = { id, code, name, price, active, imageUrl };

              return (
                <ProductCard
                  key={id}
                  name={name}
                  code={code}
                  price={price}
                  active={active}
                  image={imageUrl}
                  onClick={() => handleProductDrawerOpen(productItem)}
                />
              );
            })}
            <AddProductCard onClick={onAddProductDrawerOpen} />
          </>
        ) : (
          <Spinner />
        )}
      </Flex>
      <AddProductDrawer isOpen={isAddProductDrawerOpen} onClose={handleAddProductDrawerClose} />
      <ProductDrawer product={product} isOpen={isProductDrawerOpen} onClose={handleProductDrawerClose} />
    </ProtectedTabTemplate>
  );
};

export default ProductsManagementTab;
