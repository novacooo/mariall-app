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

  const headerBgColor = useColorModeValue('white', 'gray.800');
  const headerTextColor = useColorModeValue('gray.500', 'gray.400');

  const HeaderText = ({ children }: { children: string }) => (
    <Text
      fontSize="xs"
      color={headerTextColor}
      textTransform="uppercase"
      fontWeight="semibold"
    >
      {children}
    </Text>
  );

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
      >
        <HeaderText>Zdjęcie</HeaderText>
        <HeaderText>Nazwa produktu</HeaderText>
        <HeaderText>Aktualna ilość</HeaderText>
        <HeaderText>Ilość do dodania</HeaderText>
        <HeaderText>Akcja</HeaderText>
      </Flex>
      {[...Array(15)].map((el, i) => (
        <AddingQuantityTableRow name={`Product ${i + 1}`} />
      ))}
    </Box>
  );
};

export default AddingQuantityTable;
