import { Box, Text, Flex, useColorModeValue, Spinner } from '@chakra-ui/react';
import AddingQuantityTableRow, {
  AddingQuantityTableRowHandle,
} from 'components/AddingQuantityTableRow/AddingQuantityTableRow';
import { useErrorToast } from 'hooks/useErrorToast';
import { forwardRef, memo, useEffect, useImperativeHandle, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetProductsLazyQuery, useGetQuantitiesLazyQuery } from 'graphql/generated/schema';

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
    const rowsRefs = useRef<AddingQuantityTableRowHandle[]>([]);
    const headerBgColor = useColorModeValue('white', 'gray.800');
    const headerTextColor = useColorModeValue('gray.500', 'gray.400');

    const [getProducts, { data: getProductsData }] = useGetProductsLazyQuery({
      onError: (error) => errorToast(error),
    });

    const productsData = getProductsData?.products?.data;

    const [getQuantities] = useGetQuantitiesLazyQuery({
      onError: (error) => errorToast(error),
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
          {productsData?.map(({ id, attributes }, i) => {
            if (!id || !attributes) return null;

            const { code, name, image } = attributes;
            const imageUrl = image?.data?.attributes?.url;

            return (
              <AddingQuantityTableRow
                key={`${id}-${code}`}
                ref={(element) => {
                  rowsRefs.current[i] = element as never;
                }}
                image={
                  imageUrl && process.env.REACT_APP_IMAGE_URL
                    ? `${process.env.REACT_APP_IMAGE_URL}${imageUrl}`
                    : undefined
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
