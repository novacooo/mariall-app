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
  getCode: () => string;
}

interface AddingQuantityTableRowProps {
  image: string;
  code: string;
  name: string;
  quantity: number;
}

const AddingQuantityTableRow = forwardRef<
  AddingQuantityTableRowHandle,
  AddingQuantityTableRowProps
>(({ image, code, name, quantity }, ref) => {
  const { accentColor } = useColorContext();

  const [count, setCount] = useState(0);

  const bgColorFirst = useColorModeValue('gray.50', 'gray.900');
  const bgColorSecond = useColorModeValue('white', 'gray.800');
  const bgColorHover = useColorModeValue('gray.100', 'gray.700');
  const productCodeColor = useColorModeValue('gray.600', 'gray.300');

  useImperativeHandle(ref, () => ({
    getCount: () => count,
    getCode: () => code,
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
      if (number > 99) return 99;
      return 0;
    });
  };

  return (
    <Flex
      gap={3}
      align="center"
      justify="center"
      py={2}
      px={{
        base: 2,
        md: 5,
      }}
      bgColor={bgColorFirst}
      _odd={{ bgColor: bgColorSecond }}
      _hover={{
        bgColor: bgColorHover,
      }}
      _first={{
        roundedTop: {
          base: 'md',
          md: 'none',
        },
      }}
      _last={{ roundedBottom: 'md' }}
    >
      <Center
        w={{
          base: 'auto',
          md: 12,
        }}
        flexShrink={0}
      >
        <Box
          backgroundImage={image}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          rounded="base"
          w={10}
          h={10}
          objectFit="contain"
          borderWidth={1}
        />
      </Center>
      <Flex
        direction={{
          base: 'column',
          md: 'row',
        }}
        align={{
          base: 'flex-start',
          md: 'center',
        }}
        flexGrow={1}
        gap={{
          base: 'none',
          md: 3,
        }}
      >
        <Text
          w={{
            base: 'auto',
            md: 16,
            lg: 28,
          }}
          fontSize="xs"
          fontWeight="medium"
          textAlign="center"
          color={productCodeColor}
          flexShrink={0}
          textTransform="uppercase"
        >
          {code}
        </Text>
        <Text
          fontSize={{
            base: 'xs',
            md: 'sm',
          }}
          flexGrow={1}
          w="full"
        >
          {name}
        </Text>
      </Flex>
      <Text
        display={{
          base: 'none',
          md: 'block',
        }}
        fontSize="sm"
        w={{
          base: 'auto',
          md: 12,
          lg: 28,
        }}
        textAlign="center"
        flexShrink={0}
      >
        {quantity}
      </Text>
      <Flex
        gap={{
          base: 1,
          md: 2,
        }}
        align="center"
        justify="center"
        w={{
          base: 'auto',
          sm: 28,
          lg: 36,
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
          w={{
            base: 10,
            md: 12,
          }}
          size="sm"
          fontSize={{
            base: 'xs',
            md: 'sm',
          }}
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
