import { Box, Text, Flex, useColorModeValue, Spinner } from '@chakra-ui/react';
import AddingQuantityTableRow, {
  AddingQuantityTableRowHandle,
} from 'components/AddingQuantityTableRow/AddingQuantityTableRow';
import { useErrorToast } from 'hooks/useErrorToast';
import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetProductsLazyQuery, useGetQuantitiesLazyQuery } from 'graphql/generated/schema';

interface IProductData {
  id?: string | null;
  code?: string;
  name?: string;
  image?: string;
}

export interface IQuantity {
  code: string;
  quantity: number;
}

export interface AddingQuantityTableHandle {
  getQuantities: () => IQuantity[];
  resetQuantities: () => void;
}

interface AddingQuantityTableProps {
  workerId: string;
  year: number;
  month: number;
}

const AddingQuantityTable = forwardRef<AddingQuantityTableHandle, AddingQuantityTableProps>(
  ({ workerId, year, month }, ref) => {
    const { t } = useTranslation();
    const errorToast = useErrorToast();
    const [productsData, setProductsData] = useState<IProductData[]>();
    const rowsRefs = useRef<AddingQuantityTableRowHandle[]>([]);
    const headerBgColor = useColorModeValue('white', 'gray.800');
    const headerTextColor = useColorModeValue('gray.500', 'gray.400');

    const [getProducts] = useGetProductsLazyQuery({
      onError: (error) => {
        errorToast(error);
      },
      onCompleted: ({ products }) => {
        const newProductsData: IProductData[] = [];

        products?.data.forEach(({ id, attributes }) => {
          newProductsData.push({
            id,
            code: attributes?.code,
            name: attributes?.name,
            image: attributes?.image?.data?.attributes?.url,
          });
        });

        setProductsData(newProductsData);
      },
    });

    const [getQuantities] = useGetQuantitiesLazyQuery({
      onError: (error) => {
        errorToast(error);
      },
      onCompleted: (quantities) => {
        console.log(quantities);
      },
    });

    useImperativeHandle(ref, () => ({
      getQuantities: () => {
        const quantities: IQuantity[] = [];

        rowsRefs.current.forEach((rowRef) => {
          const code = rowRef.getCode();
          const quantity = rowRef.getCount();

          if (quantity > 0) {
            quantities.push({
              code,
              quantity,
            });
          }
        });

        return quantities;
      },
      resetQuantities: () => {
        rowsRefs.current.forEach((rowRef) => {
          rowRef.resetCount();
        });
      },
    }));

    useEffect(() => {
      void getProducts();
      void getQuantities({
        variables: {
          workerId,
          year,
          month,
        },
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [month, workerId, year]);

    if (!productsData) return <Spinner />;

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
          {productsData?.map(({ id, image, code, name }, i) => {
            if (!id || !code || !name) return null;

            return (
              <AddingQuantityTableRow
                key={`${id}-${code}`}
                ref={(element) => {
                  rowsRefs.current[i] = element as never;
                }}
                image={
                  image && process.env.REACT_APP_IMAGE_URL ? `${process.env.REACT_APP_IMAGE_URL}${image}` : undefined
                }
                name={name}
                quantity={0}
                code={code}
              />
            );
          })}
        </Box>
      </Box>
    );
  },
);

export default memo(AddingQuantityTable);
