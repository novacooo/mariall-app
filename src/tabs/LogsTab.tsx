import { Spinner, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useGetLogsQuery } from 'graphql/generated/schema';
import { useErrorToast } from 'hooks';
import ProtectedTabTemplate from 'templates/ProtectedTabTemplate';
import NoItemsInformation from 'components/NoItemsInformation/NoItemsInformation';
import LogRow from 'components/LogRow/LogRow';
import { useSearchParams } from 'react-router-dom';
import LogsPagination from 'components/LogsPagination/LogsPagination';

const LogsTab = () => {
  const { t } = useTranslation();
  const errorToast = useErrorToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: getLogsQueryData } = useGetLogsQuery({
    variables: {
      page: Number(searchParams.get('page')) || undefined,
      pageSize: Number(searchParams.get('pageSize')) || undefined,
    },
    onError: (error) => {
      errorToast(error);
    },
  });

  const logsData = getLogsQueryData?.logs?.data;
  const pageNumber = Number(searchParams.get('page')) || 1;

  if (!logsData) return <Spinner />;

  if (logsData.length === 0) return <NoItemsInformation text={t('texts.noLogs')} />;

  return (
    <ProtectedTabTemplate>
      <LogsPagination page={pageNumber} />
      <VStack spacing={1}>
        {logsData.map(({ id, attributes: logAttributes }) => {
          const userAttributes = logAttributes?.users_permissions_user?.data?.attributes;

          if (!id || !logAttributes || !userAttributes) return null;

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const { date, type, description } = logAttributes;
          const { email } = userAttributes;

          const logDate = new Date(date as string);

          return <LogRow key={id} date={logDate} type={type} description={description} email={email} />;
        })}
      </VStack>
      {logsData.length === 100 && <LogsPagination page={pageNumber} />}
    </ProtectedTabTemplate>
  );
};

export default LogsTab;
