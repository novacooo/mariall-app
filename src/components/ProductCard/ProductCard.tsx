import { useColorModeValue, VStack, Image, Heading } from '@chakra-ui/react';
import { selectThemeAccentColor } from 'features/theme/themeSlice';
import { useAppSelector } from 'hooks';
import PlaceholderImage from 'assets/images/placeholder.jpg';

interface ProductCardProps {
  name: string;
  image?: string;
  onClick?: () => void;
}

const ProductCard = ({ name, image, onClick }: ProductCardProps) => {
  const themeAccentColor = useAppSelector(selectThemeAccentColor);

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue(`${themeAccentColor}.600`, `${themeAccentColor}.200`);

  return (
    <VStack
      spacing={5}
      p={8}
      w={['full', 48]}
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
        {name}
      </Heading>
    </VStack>
  );
};

export default ProductCard;
