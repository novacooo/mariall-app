import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

interface AddingQuantityTableRowProps {
  name: string;
}

const AddingQuantityTableRow = ({ name }: AddingQuantityTableRowProps) => {
  const bgColor1 = useColorModeValue('gray.50', 'gray.800');
  const bgColor2 = useColorModeValue('white', 'gray.900');
  const bgColorHover = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex
      gap={5}
      align="center"
      py={3}
      px={5}
      bgColor={bgColor1}
      _odd={{ bgColor: bgColor2 }}
      _hover={{
        bgColor: bgColorHover,
      }}
    >
      <Box
        backgroundImage={`https://picsum.photos/100/100?random=${
          Math.random() * 100
        }`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        rounded="base"
        w={9}
        h={9}
        objectFit="contain"
        borderWidth={1}
      />
      <Text fontSize="sm">{name}</Text>
    </Flex>
  );
};

export default AddingQuantityTableRow;
