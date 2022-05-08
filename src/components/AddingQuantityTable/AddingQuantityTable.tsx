import { Box, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import AddingQuantityTableRow, {
  AddingQuantityTableRowHandle,
} from 'components/AddingQuantityTableRow/AddingQuantityTableRow';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export interface AddingQuantityTableHandle {
  showRowsCounts: () => void;
}

const AddingQuantityTable = forwardRef<AddingQuantityTableHandle>(
  (props, ref) => {
    const { t } = useTranslation();

    const rowsRefs = useRef<AddingQuantityTableRowHandle[]>([]);
    const headerBgColor = useColorModeValue('white', 'gray.800');
    const headerTextColor = useColorModeValue('gray.500', 'gray.400');

    const showRefs = () => {
      rowsRefs.current.map((el) => console.log(el.getCount()));
    };

    useImperativeHandle(ref, () => ({
      showRowsCounts: () => {
        showRefs();
      },
    }));

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
            onClick={showRefs}
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
            onClick={showRefs}
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
          {[...Array(100)].map((el, i) => (
            <AddingQuantityTableRow
              key={i}
              ref={(element) => {
                rowsRefs.current[i] = element as never;
              }}
              name={`Normal product name ${i + 1}`}
              quantity={0}
              code={`CODE-${i + 1 > 9 ? i + 1 : `0${i + 1}`}`}
            />
          ))}
        </Box>
      </Box>
    );
  },
);

export default AddingQuantityTable;
