import { Spinner, StackDivider, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { Enum_Log_Type, useGetLogsQuery } from 'graphql/generated/schema';
import { useErrorToast } from 'hooks';
import ProtectedTabTemplate from 'templates/ProtectedTabTemplate';
import NoItemsInformation from 'components/NoItemsInformation/NoItemsInformation';
import LogRow from 'components/LogRow/LogRow';

const getRandomType = (index: number) => {
  if (index % 4 === 0) return Enum_Log_Type.Warning;
  if (index % 9 === 0) return Enum_Log_Type.Error;
  return Enum_Log_Type.Info;
};

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
      <VStack spacing={1}>
        {logsData.map(({ id, attributes: logAttributes }) => {
          const userAttributes = logAttributes?.users_permissions_user?.data?.attributes;

          if (!id || !logAttributes || !userAttributes) return null;

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const { date, type, description } = logAttributes;
          const { email } = userAttributes;

          const logDate = new Date(date as string);

          return (
            <>
              {[...Array.from(Array(100).keys())].map((el) => (
                <LogRow key={el} date={logDate} type={getRandomType(el)} description={description} email={email} />
              ))}
            </>
          );
        })}
      </VStack>
    </ProtectedTabTemplate>
  );
};

export default LogsTab;
