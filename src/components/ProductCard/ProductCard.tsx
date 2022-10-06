import { useColorModeValue, VStack, Image, Text, HStack, Flex } from '@chakra-ui/react';
import { selectThemeAccentColor } from 'features/theme/themeSlice';
import { useAppSelector } from 'hooks';
import PlaceholderImage from 'assets/images/placeholder.jpg';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
  code: string;
  name: string;
  price: number;
  image?: string;
  onClick?: () => void;
}

const ProductCard = ({ code, name, price, image, onClick }: ProductCardProps) => {
  const { t } = useTranslation();
  const themeAccentColor = useAppSelector(selectThemeAccentColor);

  const bg = useColorModeValue('white', 'gray.800');
  const accentColor = useColorModeValue(`${themeAccentColor}.600`, `${themeAccentColor}.200`);
  const nameColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <VStack
      spacing={3}
      p={4}
      w={['full', 40]}
      bg={bg}
      borderWidth={1}
      rounded="md"
      transition="border-color 0.2s, transform 0.2s"
      role="group"
      _hover={{
        cursor: 'pointer',
        borderColor: accentColor,
        transform: 'scale(1.02)',
      }}
      onClick={onClick}
    >
      <Image w={20} h={20} rounded="md" borderWidth={1} borderStyle="solid" src={image || PlaceholderImage} />
      <Flex w="full" justify="space-between" direction="column" gap={2} flexGrow={1}>
        <Text fontSize="sm" noOfLines={2} color={nameColor}>
          {name}
        </Text>
        <HStack justify="space-between" align="center">
          <Text fontSize="sm" textAlign="center" fontWeight="semibold" noOfLines={1}>
            {code}
          </Text>
          <Text
            fontSize="sm"
            textAlign="center"
            fontWeight="semibold"
            noOfLines={1}
            color={accentColor}
            overflow="unset"
            whiteSpace="nowrap"
          >
            {`${price} ${t('texts.currency')}`}
          </Text>
        </HStack>
      </Flex>
    </VStack>
  );
};

export default ProductCard;
