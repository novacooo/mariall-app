import { Heading, Icon, useColorModeValue, VStack } from '@chakra-ui/react';
import { useColorContext } from 'contexts/ColorContext';
import { IconType } from 'react-icons';

interface MenuCardProps {
  name: string;
  icon: IconType;
  onClick?: () => void;
}

const MenuCard = ({ name, icon, onClick }: MenuCardProps) => {
  const { accentColor } = useColorContext();
  const bg = useColorModeValue('white', 'gray.800');
  const iconColor = useColorModeValue('gray.400', 'gray.600');
  const adaptiveAccentColor = useColorModeValue(
    `${accentColor}.600`,
    `${accentColor}.200`,
  );

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
        borderColor: adaptiveAccentColor,
        transform: 'scale(1.02)',
      }}
      onClick={onClick}
    >
      <Icon
        boxSize={16}
        as={icon}
        color={iconColor}
        transition="color 0.2s"
        _groupHover={{
          color: adaptiveAccentColor,
        }}
      />
      <Heading
        as="h4"
        size="sm"
        textAlign="center"
        fontWeight="medium"
        userSelect="none"
      >
        {name}
      </Heading>
    </VStack>
  );
};

export default MenuCard;
