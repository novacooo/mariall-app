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
import { FiMinus, FiPlus } from 'react-icons/fi';

interface AddingQuantityTableRowProps {
  name: string;
  quantity: number;
  value: number;
  onMinusClick: () => void;
  onPlusClick: () => void;
}

const AddingQuantityTableRow = ({
  name,
  quantity,
  value,
  onMinusClick,
  onPlusClick,
}: AddingQuantityTableRowProps) => {
  const { accentColor } = useColorContext();

  const bgColor1 = useColorModeValue('gray.50', 'gray.900');
  const bgColor2 = useColorModeValue('white', 'gray.800');
  const bgColorHover = useColorModeValue('gray.100', 'gray.700');

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
          onClick={onMinusClick}
        />
        <Input w={10} size="sm" rounded="md" value={value} textAlign="center" />
        <IconButton
          aria-label="Increment button"
          icon={<FiPlus />}
          size="xs"
          colorScheme={accentColor}
          onClick={onPlusClick}
        />
      </Flex>
    </Flex>
  );
};

export default AddingQuantityTableRow;
