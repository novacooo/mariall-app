import { HStack, Spinner, StackDivider, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useGetLogsQuery } from 'graphql/generated/schema';
import { useErrorToast } from 'hooks';
import ProtectedTabTemplate from 'templates/ProtectedTabTemplate';
import NoItemsInformation from 'components/NoItemsInformation/NoItemsInformation';

const LogsTab = () => {
  const { t } = useTranslation();
  const errorToast = useErrorToast();

  const { data: getLogsQueryData } = useGetLogsQuery({
    onError: (error) => {
      errorToast(error);
    },
  });

  const logsData = getLogsQueryData?.logs?.data;

  if (!logsData) return <Spinner />;

  if (logsData.length === 0) return <NoItemsInformation text={t('texts.noLogs')} />;

  return (
    <ProtectedTabTemplate>
      <VStack align="flex-start" divider={<StackDivider />}>
        {logsData.map(({ id, attributes: logAttributes }) => {
          const userAttributes = logAttributes?.users_permissions_user?.data?.attributes;

          if (!id || !logAttributes || !userAttributes) return null;

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const { date, type, description } = logAttributes;

          const logDate = new Date(date as string);

          return (
            <HStack spacing={4}>
              <Text>{date}</Text>
              <Text>{type}</Text>
              <Text>{description}</Text>
              <Text>{userAttributes.email}</Text>
            </HStack>
          );
        })}
      </VStack>
    </ProtectedTabTemplate>
  );
};

export default LogsTab;
