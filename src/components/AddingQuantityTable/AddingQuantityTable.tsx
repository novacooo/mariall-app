import { Box, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import AddingQuantityTableRow, {
  AddingQuantityTableRowHandle,
} from 'components/AddingQuantityTableRow/AddingQuantityTableRow';
import { useRef } from 'react';

const AddingQuantityTable = () => {
  const rowsRefs = useRef<AddingQuantityTableRowHandle[]>([]);
  const headerBgColor = useColorModeValue('white', 'gray.800');
  const headerTextColor = useColorModeValue('gray.500', 'gray.400');

  const showRefs = () => {
    rowsRefs.current.map((el) => console.log(el.getCount()));
  };

  return (
    <Box borderWidth={1} rounded="md">
      <Flex
        display={{
          base: 'none',
          md: 'flex',
        }}
        gap={5}
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
          Zdjęcie
        </Text>
        <Text
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          w={{
            base: 24,
            md: 28,
          }}
          onClick={showRefs}
        >
          Kod produktu
        </Text>
        <Text
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          flexGrow={1}
          textAlign="start"
        >
          Nazwa produktu
        </Text>
        <Text
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          w={{
            base: 16,
            md: 28,
          }}
        >
          Aktualna ilość
        </Text>
        <Text
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          w={{
            base: 28,
            md: 36,
          }}
        >
          Ilość do dodania
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
};

export default AddingQuantityTable;
