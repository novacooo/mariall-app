import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  Text,
  MenuOptionGroup,
  Tooltip,
} from '@chakra-ui/react';
import { Languages } from 'constants/languages';
import { useTranslation } from 'react-i18next';
import { FiGlobe } from 'react-icons/fi';
import ReactCountryFlag from 'react-country-flag';

const LanguageButton = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: Languages) => {
    void i18n.changeLanguage(language);
  };

  return (
    <Menu closeOnSelect={false}>
      <Tooltip label={t('tooltips.changeLanguage')}>
        <MenuButton as={IconButton} variant="outline" aria-label={t('tooltips.changeLanguage')} icon={<FiGlobe />} />
      </Tooltip>
      <MenuList>
        <MenuOptionGroup defaultValue={i18n.language} type="radio">
          <MenuItemOption
            value={Languages.ENGLISH}
            fontSize="sm"
            textTransform="capitalize"
            onClick={() => changeLanguage(Languages.ENGLISH)}
          >
            <HStack>
              <ReactCountryFlag countryCode="US" svg style={{ marginTop: '1px', fontSize: '16px' }} />
              <Text>{t('languages.english')}</Text>
            </HStack>
          </MenuItemOption>
          <MenuItemOption
            value={Languages.POLISH}
            fontSize="sm"
            textTransform="capitalize"
            onClick={() => changeLanguage(Languages.POLISH)}
          >
            <HStack>
              <ReactCountryFlag countryCode="PL" svg style={{ marginTop: '1px', fontSize: '16px' }} />
              <Text>{t('languages.polish')}</Text>
            </HStack>
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default LanguageButton;
