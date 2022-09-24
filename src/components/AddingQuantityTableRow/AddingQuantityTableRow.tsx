import { Box, Center, Flex, IconButton, Input, Text, useColorModeValue } from '@chakra-ui/react';
import { useColorContext } from 'contexts/ColorContext';
import { usePrevious } from 'hooks';
import { useImperativeHandle, forwardRef, useState, ChangeEvent, useEffect } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import PlaceholderImage from '../../assets/images/placeholder.jpg';

export interface IQuantity {
  productId: string;
  productCode: string;
  quantityId: string | undefined;
  quantity: number;
  count: number;
}

export interface AddingQuantityTableRowHandle {
  getCount: () => number;
  getQuantity: () => IQuantity;
  resetCount: () => void;
}

interface AddingQuantityTableRowProps {
  productId: string;
  productCode: string;
  productName: string;
  quantityId: string | undefined;
  quantity: number;
  image?: string;
  onValueChange?: () => void;
}

const AddingQuantityTableRow = forwardRef<AddingQuantityTableRowHandle, AddingQuantityTableRowProps>(
  ({ image, productId, productCode, productName, quantityId, quantity, onValueChange }, ref) => {
    const { accentColor } = useColorContext();

    const [count, setCount] = useState(0);
    const previousCount = usePrevious(count);

    const bgColorFirst = useColorModeValue('gray.50', 'gray.900');
    const bgColorSecond = useColorModeValue('white', 'gray.800');
    const bgColorHover = useColorModeValue('gray.100', 'gray.700');
    const productCodeColor = useColorModeValue('gray.600', 'gray.300');

    useImperativeHandle(ref, () => ({
      getCount: () => count,
      getQuantity: () => ({
        productId,
        productCode,
        quantityId,
        count,
        quantity: quantity + count,
      }),
      resetCount: () => {
        setCount(0);
      },
    }));

    const handleMinusClick = () => {
      setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    };

    const handlePlusClick = () => {
      setCount((prevCount) => (prevCount < 99 ? prevCount + 1 : 99));
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      let number = parseInt(e.target.value, 10);

      if (number > 99) number = 99;
      if (number < 0) number = 0;

      setCount(number);
    };

    useEffect(() => {
      const previousCondition = previousCount !== 0;
      const actualCondition = count !== 0;

      if (previousCondition === actualCondition) return;

      if (onValueChange) onValueChange();
    }, [count]);

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
            backgroundImage={image || PlaceholderImage}
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
            {productCode}
          </Text>
          <Text
            fontSize={{
              base: 'xs',
              md: 'sm',
            }}
            flexGrow={1}
            w="full"
          >
            {productName}
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
  },
);

export default AddingQuantityTableRow;
