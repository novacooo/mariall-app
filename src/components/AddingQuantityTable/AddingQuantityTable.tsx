import { Box, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import AddingQuantityTableRow from 'components/AddingQuantityTableRow/AddingQuantityTableRow';

const AddingQuantityTable = () => {
  const headerBgColor = useColorModeValue('white', 'gray.800');
  const headerTextColor = useColorModeValue('gray.500', 'gray.400');

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
        >
          Zdjęcie
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
      {[...Array(100)].map((el, i) => (
        <AddingQuantityTableRow
          key={i}
          quantity={0}
          name={`Normal product name ${i + 1}`}
        />
      ))}
    </Box>
  );
};

export default AddingQuantityTable;
