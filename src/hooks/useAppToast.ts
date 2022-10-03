import { useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface ISuccessToastPayload {
  title: string;
  description: string;
  status?: 'info' | 'warning' | 'success' | 'error' | 'loading' | undefined;
}

export const useAppToast = () => {
  const { t } = useTranslation();

  const toast = useToast({
    description: t('toasts.descriptions.unableToSave'),
    duration: 5000,
    isClosable: true,
    position: 'top',
  });

  const appToast = ({ title, description, status = 'success' }: ISuccessToastPayload) => {
    toast({ title, description, status });
  };

  return appToast;
};
