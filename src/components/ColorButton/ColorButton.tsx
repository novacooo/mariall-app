import {
  Box,
  HStack,
  IconButton,
  Text,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Tooltip,
} from '@chakra-ui/react';
import { AccentColorType, useColorContext } from 'contexts/ColorContext';
import { useTranslation } from 'react-i18next';
import { BiPalette } from 'react-icons/bi';

const colors: AccentColorType[] = [
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
];

const ColorButton = () => {
  const { t } = useTranslation();
  const { accentColor, changeAccentColor } = useColorContext();

  return (
    <Menu closeOnSelect={false}>
      <Tooltip label={t('tooltips.changeColor')}>
        <MenuButton
          as={IconButton}
          variant="outline"
          aria-label={t('tooltips.changeColor')}
          icon={<BiPalette />}
        />
      </Tooltip>
      <MenuList>
        <MenuOptionGroup defaultValue={accentColor} type="radio">
          {colors.map((color) => (
            <MenuItemOption
              key={color}
              value={color}
              fontSize="sm"
              textTransform="capitalize"
              onClick={() => changeAccentColor(color)}
            >
              <HStack>
                <Box
                  width={3}
                  height={3}
                  rounded="full"
                  bgColor={`${color}.400`}
                />
                <Text>{t(`colors.${color}`)}</Text>
              </HStack>
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default ColorButton;
