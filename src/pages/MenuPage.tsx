import { Flex, Heading, VStack } from '@chakra-ui/react';
import MenuCard from 'components/MenuCard/MenuCard';
import { useTranslation } from 'react-i18next';
import { FiPackage } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { routes } from 'routes';
import AuthenticatedPageTemplate from 'templates/AuthenticatedPageTemplate';
import PageTemplate from 'templates/PageTemplate';

const MenuPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <AuthenticatedPageTemplate>
      <PageTemplate name={t('pagesHeaders.menu')}>
        <VStack
          spacing={{
            base: 6,
            md: 10,
          }}
          w="full"
        >
          <Heading as="h4" size="md">
            {t('headers.chooseApp')}
          </Heading>
          <Flex direction={['column', 'row']} flexWrap="wrap" justify="center" gap={6} w="80%">
            <MenuCard
              name={t('appNames.productionManagement')}
              icon={FiPackage}
              onClick={() => navigate(routes.panel)}
            />
          </Flex>
        </VStack>
      </PageTemplate>
    </AuthenticatedPageTemplate>
  );
};

export default MenuPage;
