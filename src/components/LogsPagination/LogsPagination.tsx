import { HStack, Heading, useColorModeValue, IconButton, Tooltip } from '@chakra-ui/react';
import { selectThemeAccentColor } from 'features/theme/themeSlice';
import { useAppSelector } from 'hooks';
import { useTranslation } from 'react-i18next';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface LogsPaginationProps {
  page: number;
  disabledPreviousButton?: boolean;
  disabledNextButton?: boolean;
  onPreviousButtonClick?: () => void;
  onNextButtonClick?: () => void;
}

const LogsPagination = ({
  page,
  disabledPreviousButton,
  disabledNextButton,
  onPreviousButtonClick,
  onNextButtonClick,
}: LogsPaginationProps) => {
  const { t } = useTranslation();

  const themeAccentColor = useAppSelector(selectThemeAccentColor);

  const color = useColorModeValue(`${themeAccentColor}.600`, `${themeAccentColor}.400`);

  return (
    <HStack justify="space-between">
      <Tooltip label={t('tooltips.previousPage')}>
        <IconButton
          aria-label={t('tooltips.previousPage')}
          icon={<FiChevronLeft />}
          disabled={disabledPreviousButton}
          onClick={onPreviousButtonClick}
        />
      </Tooltip>
      <Heading as="h4" size="sm" color={color}>
        {page}
      </Heading>
      <Tooltip label={t('tooltips.nextPage')}>
        <IconButton
          aria-label={t('tooltips.nextPage')}
          icon={<FiChevronRight />}
          disabled={disabledNextButton}
          onClick={onNextButtonClick}
        />
      </Tooltip>
    </HStack>
  );
};

export default LogsPagination;
