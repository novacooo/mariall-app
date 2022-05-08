import { Box, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import AddingQuantityTableRow, {
  AddingQuantityTableRowHandle,
} from 'components/AddingQuantityTableRow/AddingQuantityTableRow';
import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

interface IProductData {
  image: string;
  code: string;
  name: string;
  quantity: number;
}

const products: IProductData[] = [
  {
    image: 'https://picsum.photos/100/100?random=1',
    code: 'product-01',
    name: 'Product 1',
    quantity: 2,
  },
  {
    image: 'https://picsum.photos/100/100?random=2',
    code: 'product-02',
    name: 'Product 2',
    quantity: 33,
  },
  {
    image: 'https://picsum.photos/100/100?random=3',
    code: 'product-03',
    name: 'Product 3',
    quantity: 10,
  },
  {
    image: 'https://picsum.photos/100/100?random=4',
    code: 'product-04',
    name: 'Product 4',
    quantity: 8,
  },
  {
    image: 'https://picsum.photos/100/100?random=5',
    code: 'product-05',
    name: 'Product 5',
    quantity: 7,
  },
];

export interface IQuantity {
  code: string;
  quantity: number;
}

export interface AddingQuantityTableHandle {
  getQuantities: () => IQuantity[];
}

const getProducts = () => {
  return new Promise<IProductData[]>((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 300);
  });
};

const AddingQuantityTable = memo(
  forwardRef<AddingQuantityTableHandle>((props, ref) => {
    const { t } = useTranslation();
    const [productsData, setProductsData] = useState<IProductData[]>();

    const rowsRefs = useRef<AddingQuantityTableRowHandle[]>([]);
    const headerBgColor = useColorModeValue('white', 'gray.800');
    const headerTextColor = useColorModeValue('gray.500', 'gray.400');

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
    }));

    useEffect(() => {
      const fetchProductsData = async () => {
        try {
          const data = await getProducts();
          setProductsData(data);
        } catch (err) {
          console.error(`Error: ${err}`);
        }
      };

      fetchProductsData();
    }, []);

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
          <Text
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            w={12}
          >
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
          <Text
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            flexGrow={1}
            textAlign="start"
          >
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
          {productsData?.map(({ image, code, name, quantity }, i) => (
            <AddingQuantityTableRow
              key={code}
              ref={(element) => {
                rowsRefs.current[i] = element as never;
              }}
              image={image}
              name={name}
              quantity={quantity}
              code={code}
            />
          ))}
        </Box>
      </Box>
    );
  }),
);

export default AddingQuantityTable;
