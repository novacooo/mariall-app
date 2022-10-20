import { Box, Text, Flex, useColorModeValue, Spinner } from '@chakra-ui/react';
import AddingQuantityTableRow, {
  AddingQuantityTableRowHandle,
  IQuantity,
} from 'components/AddingQuantityTableRow/AddingQuantityTableRow';
import { useErrorToast } from 'hooks';
import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetProductsLazyQuery, useGetQuantitiesLazyQuery } from 'graphql/generated/schema';
import { getImageUrl } from 'helpers';
import NoItemsInformation from 'components/NoItemsInformation/NoItemsInformation';

export interface AddingQuantityTableHandle {
  getQuantities: () => IQuantity[];
  resetQuantities: () => void;
}

interface IProductWithQuantities {
  productId: string;
  productCode: string;
  productName: string;
  productImageUrl?: string;
  quantityId?: string;
  quantity?: number;
}

interface AddingQuantityTableProps {
  workerId: string;
  year: number;
  month: number;
  setIsAddedAnyQuantity: (param: boolean) => void;
}

const AddingQuantityTable = forwardRef<AddingQuantityTableHandle, AddingQuantityTableProps>(
  ({ workerId, year, month, setIsAddedAnyQuantity }, ref) => {
    const { t } = useTranslation();
    const errorToast = useErrorToast();
    const rowsRefs = useRef<AddingQuantityTableRowHandle[]>([]);
    const headerBgColor = useColorModeValue('white', 'gray.800');
    const headerTextColor = useColorModeValue('gray.500', 'gray.400');
    const [productsWithQuantities, setProductsWithQuantities] = useState<IProductWithQuantities[]>();

    const [getProducts] = useGetProductsLazyQuery({
      onError: (error) => errorToast(error),
    });

    const [getQuantities] = useGetQuantitiesLazyQuery({
      onError: (error) => errorToast(error),
    });

    useImperativeHandle(ref, () => ({
      getQuantities: () => {
        const quantities: IQuantity[] = [];

        rowsRefs.current.forEach((rowRef) => {
          const quantity = rowRef.getQuantity();
          if (quantity.count === 0) return;
          quantities.push(quantity);
        });

        return quantities;
      },
      resetQuantities: () => {
        rowsRefs.current.forEach((rowRef) => {
          rowRef.resetCount();
        });
      },
    }));

    const handleRowChange = () => {
      const isNotAdded = rowsRefs.current.every((rowRef) => {
        const quantity = rowRef.getCount();
        if (quantity !== 0) return false;
        return true;
      });

      setIsAddedAnyQuantity(!isNotAdded);
    };

    useEffect(() => {
      const fetchData = async () => {
        const getProductsResponse = await getProducts();
        const getQuantitiesResponse = await getQuantities({ variables: { workerId, year, month } });

        const productsData = getProductsResponse.data?.products?.data;
        const quantitiesData = getQuantitiesResponse.data?.quantities?.data;

        const newProductsWithQuantities: IProductWithQuantities[] = [];

        productsData?.forEach(({ id: productId, attributes: productAttributes }) => {
          if (!productId || !productAttributes) return;

          if (!productAttributes.active) return;

          const { code: productCode, name: productName, image: productImage } = productAttributes;

          const quantityIndex = quantitiesData?.findIndex(
            ({ attributes }) => attributes?.product?.data?.id === productId,
          );

          let quantityId: string | undefined;
          let quantity: number | undefined;

          if (quantitiesData && quantityIndex !== undefined && quantityIndex !== -1) {
            quantityId = quantitiesData[quantityIndex].id || undefined;
            quantity = quantitiesData[quantityIndex].attributes?.quantity;
          }

          const newProduct: IProductWithQuantities = {
            productId,
            productCode,
            productName,
            quantityId,
            quantity,
            productImageUrl: productImage?.data?.attributes?.url,
          };

          newProductsWithQuantities.push(newProduct);
        });

        setProductsWithQuantities(newProductsWithQuantities);
      };

      void fetchData();
    }, [workerId, year, month]);

    if (!productsWithQuantities) return <Spinner />;

    if (productsWithQuantities.length === 0) return <NoItemsInformation text={t('texts.noProducts')} />;

    return (
      <Box borderWidth={1} rounded="md">
        <Flex
          display={{
            base: 'none',
            md: 'flex',
          }}
          gap={3}
          align="center"
          py={3}
          px={{
            base: 2,
            md: 5,
          }}
          bgColor={headerBgColor}
          roundedTop="md"
          borderBottomWidth={1}
          fontSize="xs"
          color={headerTextColor}
          textTransform="uppercase"
          fontWeight="semibold"
          textAlign="center"
        >
          <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" w={12}>
            {t('tables.productImage')}
          </Text>
          <Text
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            w={{
              md: 16,
              lg: 28,
            }}
          >
            {t('tables.productCode')}
          </Text>
          <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" flexGrow={1} textAlign="start">
            {t('tables.productName')}
          </Text>
          <Text
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            w={{
              md: 12,
              lg: 28,
            }}
          >
            {t('tables.productQuantity')}
          </Text>
          <Text
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            w={{
              md: 28,
              lg: 36,
            }}
          >
            {t('tables.productAdding')}
          </Text>
        </Flex>
        <Box>
          {productsWithQuantities.map(
            ({ productId, productCode, productName, productImageUrl, quantityId, quantity }, i) => (
              <AddingQuantityTableRow
                key={`${productId}-${productCode}`}
                ref={(element) => {
                  if (!element) return;
                  rowsRefs.current[i] = element;
                }}
                productId={productId}
                productCode={productCode}
                productName={productName}
                quantityId={quantityId}
                quantity={quantity || 0}
                image={getImageUrl(productImageUrl)}
                onValueChange={handleRowChange}
              />
            ),
          )}
        </Box>
      </Box>
    );
  },
);

export default memo(AddingQuantityTable);
