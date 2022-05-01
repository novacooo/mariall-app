import {
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Tooltip,
} from '@chakra-ui/react';
import { Languages } from 'constants/languages';
import { useTranslation } from 'react-i18next';
import { FiGlobe } from 'react-icons/fi';

const LanguageButton = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: Languages) => {
    i18n.changeLanguage(language);
  };

  return (
    <Menu closeOnSelect={false}>
      <Tooltip label={t('tooltips.changeLanguage')}>
        <MenuButton
          as={IconButton}
          variant="outline"
          aria-label={t('tooltips.changeLanguage')}
          icon={<FiGlobe />}
        />
      </Tooltip>
      <MenuList>
        <MenuOptionGroup defaultValue={i18n.language} type="radio">
          <MenuItemOption
            value={Languages.ENGLISH}
            fontSize="sm"
            textTransform="capitalize"
            onClick={() => changeLanguage(Languages.ENGLISH)}
          >
            {t('languages.english')}
          </MenuItemOption>
          <MenuItemOption
            value={Languages.POLISH}
            fontSize="sm"
            textTransform="capitalize"
            onClick={() => changeLanguage(Languages.POLISH)}
          >
            {t('languages.polish')}
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default LanguageButton;
