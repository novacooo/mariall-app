import { useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { getErrorMessage } from 'helpers';

export const useErrorToast = () => {
  const { t } = useTranslation();

  const toast = useToast({
    title: t('toasts.titles.somethingWentWrong'),
    duration: 5000,
    status: 'error',
    isClosable: true,
    position: 'top',
  });

  const errorToast = (error: unknown) => {
    const message = getErrorMessage(error);

    toast({
      description: `${t('toasts.descriptions.somethingWentWrong')} ${message}`,
    });
  };

  return errorToast;
};
