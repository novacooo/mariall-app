import { Box, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import AddingQuantityTableRow from 'components/AddingQuantityTableRow/AddingQuantityTableRow';
import { useColorContext } from 'contexts/ColorContext';

const AddingQuantityTable = () => {
  const { accentColor } = useColorContext();

  const headerBgColor = useColorModeValue('white', 'gray.800');
  const headerTextColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <Box borderWidth={1} rounded="md">
      <Flex
        gap={5}
        align="center"
        py={3}
        px={5}
        bgColor={headerBgColor}
        roundedTop="md"
        borderBottomWidth={1}
        fontSize="xs"
        color={headerTextColor}
        textTransform="uppercase"
        fontWeight="semibold"
      >
        <Text w={16} textAlign="center">
          Zdjęcie
        </Text>
        <Text flexGrow={1}>Nazwa produktu</Text>
        <Text w={28} textAlign="center">
          Aktualna ilość
        </Text>
        <Text w={36} textAlign="center">
          Ilość do dodania
        </Text>
      </Flex>
      {[...Array(15)].map((el, i) => (
        <AddingQuantityTableRow
          quantity={0}
          name={`Very long product name that can take a lot of space ${i + 1}`}
        />
      ))}
    </Box>
  );
};

export default AddingQuantityTable;
