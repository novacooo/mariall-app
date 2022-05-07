import {
  Box,
  Center,
  Text,
  Flex,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import AddingQuantityTableRow from 'components/AddingQuantityTableRow/AddingQuantityTableRow';
import { useColorContext } from 'contexts/ColorContext';

const AddingQuantityTable = () => {
  const { accentColor } = useColorContext();

  const headerBgColor = useColorModeValue('white', 'gray.900');

  return (
    <Box borderWidth={1} rounded="md">
      <Flex
        gap={5}
        align="center"
        py={3}
        px={5}
        bgColor={headerBgColor}
        roundedTop="md"
      >
        <Text>Zdjęcie</Text>
        <Text>Nazwa produktu</Text>
        <Text>Aktualna ilość</Text>
        <Text>Ilość do dodania</Text>
      </Flex>
      {[...Array(50)].map((el, i) => (
        <AddingQuantityTableRow name={`Product ${i + 1}`} />
      ))}
    </Box>
  );
};

export default AddingQuantityTable;
