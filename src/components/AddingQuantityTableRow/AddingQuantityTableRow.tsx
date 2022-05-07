import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
  useColorModeValue,
  useNumberInput,
} from '@chakra-ui/react';
import { useColorContext } from 'contexts/ColorContext';
import { FiMinus, FiPlus } from 'react-icons/fi';

interface AddingQuantityTableRowProps {
  name: string;
  quantity: number;
}

const AddingQuantityTableRow = ({
  name,
  quantity,
}: AddingQuantityTableRowProps) => {
  const { accentColor } = useColorContext();

  const bgColor1 = useColorModeValue('gray.50', 'gray.900');
  const bgColor2 = useColorModeValue('white', 'gray.800');
  const bgColorHover = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex
      gap={5}
      align="center"
      py={2}
      px={5}
      bgColor={bgColor1}
      _odd={{ bgColor: bgColor2 }}
      _hover={{
        bgColor: bgColorHover,
      }}
      _last={{ roundedBottom: 'md' }}
    >
      <Center w={16} flexShrink={0}>
        <Box
          backgroundImage={`https://picsum.photos/100/100?random=${
            Math.random() * 100
          }`}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          rounded="base"
          w={8}
          h={8}
          objectFit="contain"
          borderWidth={1}
        />
      </Center>
      <Text fontSize="sm" flexGrow={1}>
        {name}
      </Text>
      <Text fontSize="sm" w={28} textAlign="center" flexShrink={0}>
        {quantity}
      </Text>
      <Center>
        <Flex gap={2} align="center" justify="center" w={36} flexShrink={0}>
          <IconButton
            aria-label="Decrement button"
            icon={<FiMinus />}
            size="xs"
            colorScheme={accentColor}
          />
          <Input
            w={10}
            size="sm"
            rounded="md"
            defaultValue={0}
            textAlign="center"
          />
          <IconButton
            aria-label="Increment button"
            icon={<FiPlus />}
            size="xs"
            colorScheme={accentColor}
          />
        </Flex>
      </Center>
    </Flex>
  );
};

export default AddingQuantityTableRow;
