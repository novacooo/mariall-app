import { Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import PageTemplate from 'templates/PageTemplate';

const MenuPage = () => {
  const { t } = useTranslation();

  return (
    <PageTemplate name={t('pagesHeaders.menu')}>
      <Heading>{t('headers.chooseApp')}</Heading>
      <Link to={routes.panel}>panel</Link>
      <Link to={routes.login}>login</Link>
    </PageTemplate>
  );
};

export default MenuPage;
