import { useTranslation } from 'react-i18next';
import PanelTemplate from 'templates/PanelTemplate';

const PanelPage = () => {
  const { t } = useTranslation();

  return (
    <PanelTemplate name="Zarządzanie produktami">
      <p>{t('title')}</p>
    </PanelTemplate>
  );
};

export default PanelPage;
