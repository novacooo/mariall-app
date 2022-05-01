import { IconButton, Tooltip, useColorMode } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FiMoon, FiSun } from 'react-icons/fi';

const ColorModeButton = () => {
  const { t } = useTranslation();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip label={t('tooltips.toggleTheme')}>
      <IconButton
        onClick={toggleColorMode}
        variant="outline"
        aria-label={t('tooltips.toggleTheme')}
        icon={colorMode === 'light' ? <FiSun /> : <FiMoon />}
      />
    </Tooltip>
  );
};

export default ColorModeButton;
