import { useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

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
    let message = 'Unknown Error';
    if (error instanceof Error) message = error.message;

    toast({
      description: `${t('toasts.descriptions.somethingWentWrong')} ${message}`,
    });
  };

  return errorToast;
};
