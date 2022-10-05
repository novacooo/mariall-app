import { Spinner } from '@chakra-ui/react';
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
      <div>
        {productsData ? (
          productsData.map(({ id, attributes }) => {
            if (!id || !attributes) return null;
            return (
              <ProductCard
                key={id}
                name={attributes.code}
                image={getImageUrl(attributes.image?.data?.attributes?.url)}
              />
            );
          })
        ) : (
          <Spinner />
        )}
      </div>
    </ProtectedTabTemplate>
  );
};

export default ProductsManagementTab;
