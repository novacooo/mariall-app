import { useColorModeValue, VStack, Text, Icon } from '@chakra-ui/react';
import { selectThemeAccentColor } from 'features/theme/themeSlice';
import { useAppSelector } from 'hooks';
import { useTranslation } from 'react-i18next';
import { FiFilePlus } from 'react-icons/fi';

interface AddProductCardProps {
  onClick?: () => void;
}

const AddProductCard = ({ onClick }: AddProductCardProps) => {
  const { t } = useTranslation();

  const themeAccentColor = useAppSelector(selectThemeAccentColor);

  const grayColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const accentColor = useColorModeValue(`${themeAccentColor}.600`, `${themeAccentColor}.200`);

  return (
    <VStack
      justify="center"
      p={4}
      w={['full', 44]}
      borderWidth={2}
      borderStyle="dashed"
      borderColor={borderColor}
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
      <Icon
        boxSize={8}
        as={FiFilePlus}
        color={grayColor}
        transition="color 0.2s"
        _groupHover={{
          color: accentColor,
        }}
      />
      <Text
        fontSize="md"
        fontWeight="semibold"
        textAlign="center"
        userSelect="none"
        color={grayColor}
        transition="color 0.2s"
        _groupHover={{
          color: accentColor,
        }}
      >
        {t('buttons.addNewProduct')}
      </Text>
    </VStack>
  );
};

export default AddProductCard;
