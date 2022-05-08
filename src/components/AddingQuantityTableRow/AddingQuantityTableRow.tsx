import {
  Box,
  Center,
  Flex,
  IconButton,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useColorContext } from 'contexts/ColorContext';
import { useImperativeHandle, forwardRef, useState, ChangeEvent } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

export interface AddingQuantityTableRowHandle {
  getCount: () => number;
}

interface AddingQuantityTableRowProps {
  name: string;
  quantity: number;
}

const AddingQuantityTableRow = forwardRef<
  AddingQuantityTableRowHandle,
  AddingQuantityTableRowProps
>(({ name, quantity }, ref) => {
  const [count, setCount] = useState(0);
  const { accentColor } = useColorContext();

  const bgColor1 = useColorModeValue('gray.50', 'gray.900');
  const bgColor2 = useColorModeValue('white', 'gray.800');
  const bgColorHover = useColorModeValue('gray.100', 'gray.700');

  useImperativeHandle(ref, () => ({
    getCount: () => {
      return count;
    },
  }));

  const handleMinusClick = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  const handlePlusClick = () => {
    setCount((prevCount) => (prevCount < 99 ? prevCount + 1 : 99));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCount(() => {
      const number = parseInt(e.target.value, 10);
      if (number >= 0 && number <= 99) return number;
      if (number < 0) return 0;
      return 99;
    });
  };

  return (
    <Flex
      gap={5}
      wrap="wrap"
      align="center"
      justify="center"
      py={2}
      px={{
        base: 2,
        md: 5,
      }}
      bgColor={bgColor1}
      _odd={{ bgColor: bgColor2 }}
      _hover={{
        bgColor: bgColorHover,
      }}
      _last={{ roundedBottom: 'md' }}
    >
      <Center w={12} flexShrink={0}>
        <Box
          backgroundImage="https://picsum.photos/100"
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
      <Text
        fontSize="sm"
        flexGrow={1}
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {name}
      </Text>
      <Text
        fontSize="sm"
        w={{
          base: 16,
          md: 28,
        }}
        textAlign="center"
        flexShrink={0}
      >
        {quantity}
      </Text>
      <Flex
        gap={2}
        align="center"
        justify="center"
        w={{
          base: 28,
          md: 36,
        }}
        flexShrink={0}
      >
        <IconButton
          aria-label="Decrement button"
          icon={<FiMinus />}
          size="xs"
          colorScheme={accentColor}
          onClick={handleMinusClick}
        />
        <Input
          w={12}
          size="sm"
          rounded="md"
          value={count}
          textAlign="center"
          onChange={handleInputChange}
        />
        <IconButton
          aria-label="Increment button"
          icon={<FiPlus />}
          size="xs"
          colorScheme={accentColor}
          onClick={handlePlusClick}
        />
      </Flex>
    </Flex>
  );
});

export default AddingQuantityTableRow;
