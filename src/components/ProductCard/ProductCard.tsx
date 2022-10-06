import { useColorModeValue, VStack, Image, Heading, Text } from '@chakra-ui/react';
import { selectThemeAccentColor } from 'features/theme/themeSlice';
import { useAppSelector } from 'hooks';
import PlaceholderImage from 'assets/images/placeholder.jpg';

interface ProductCardProps {
  code: string;
  name: string;
  price: number;
  image?: string;
  onClick?: () => void;
}

const ProductCard = ({ code, name, price, image, onClick }: ProductCardProps) => {
  const themeAccentColor = useAppSelector(selectThemeAccentColor);

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue(`${themeAccentColor}.600`, `${themeAccentColor}.200`);

  return (
    <VStack
      spacing={4}
      p={4}
      w={['full', 36]}
      bg={bg}
      borderWidth={1}
      rounded="md"
      transition="border-color 0.2s, transform 0.2s"
      role="group"
      _hover={{
        cursor: 'pointer',
        borderColor,
        transform: 'scale(1.02)',
      }}
      onClick={onClick}
    >
      <Image w={20} h={20} rounded="md" borderWidth={1} borderStyle="solid" src={image || PlaceholderImage} />
      <Heading as="h4" size="sm" textAlign="center" userSelect="none">
        {code}
      </Heading>
      <Text>{name}</Text>
    </VStack>
  );
};

export default ProductCard;
