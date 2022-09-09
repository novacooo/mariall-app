import { useLazyQuery } from '@apollo/client';
import { Box, Text, Flex, useColorModeValue, Spinner } from '@chakra-ui/react';
import AddingQuantityTableRow, {
  AddingQuantityTableRowHandle,
} from 'components/AddingQuantityTableRow/AddingQuantityTableRow';
import { getProductsQuery, GetProductsQueryPayload } from 'graphql/queries/getProductsQuery';
import { useErrorToast } from 'hooks/useErrorToast';
import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IProductData {
  id: number;
  code: string;
  name: string;
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
  month: string;
}

const AddingQuantityTable = forwardRef<AddingQuantityTableHandle, AddingQuantityTableProps>(
  ({ workerId, year, month }, ref) => {
    const { t } = useTranslation();
    const errorToast = useErrorToast();
    const [productsData, setProductsData] = useState<IProductData[]>();
    const rowsRefs = useRef<AddingQuantityTableRowHandle[]>([]);
    const headerBgColor = useColorModeValue('white', 'gray.800');
    const headerTextColor = useColorModeValue('gray.500', 'gray.400');

    const [getProducts] = useLazyQuery<GetProductsQueryPayload>(getProductsQuery, {
      onError: (error) => {
        errorToast(error);
      },
      onCompleted: ({ products }) => {
        const newProductsData: IProductData[] = [];

        products.data.forEach((product) => {
          const {
            id,
            attributes: { code, name, image },
          } = product;

          newProductsData.push({
            id,
            code,
            name,
            image: image?.data.attributes.url,
          });
        });

        setProductsData(newProductsData);
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
          {productsData?.map(({ image, code, name }, i) => (
            <AddingQuantityTableRow
              key={code}
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
          ))}
        </Box>
      </Box>
    );
  },
);

export default memo(AddingQuantityTable);
