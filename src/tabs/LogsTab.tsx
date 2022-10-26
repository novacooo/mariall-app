import { Spinner, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Navigate, useSearchParams } from 'react-router-dom';

import { useGetLogsQuery } from 'graphql/generated/schema';
import { useErrorToast } from 'hooks';
import ProtectedTabTemplate from 'templates/ProtectedTabTemplate';
import NoItemsInformation from 'components/NoItemsInformation/NoItemsInformation';
import LogRow from 'components/LogRow/LogRow';
import LogsPagination from 'components/LogsPagination/LogsPagination';
import { routes } from 'routes';
import { useLogger } from 'hooks/useLogger';
import { getErrorMessage } from 'helpers';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 50;

const LogsTab = () => {
  const { t } = useTranslation();
  const errorToast = useErrorToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const logger = useLogger();

  const pageParamValue = Number(searchParams.get('page')) || DEFAULT_PAGE;
  const pageSizeParamValue = Number(searchParams.get('pageSize')) || DEFAULT_PAGE_SIZE;

  const { data: getLogsQueryData } = useGetLogsQuery({
    variables: {
      page: pageParamValue,
      pageSize: pageSizeParamValue,
    },
    onError: (error) => {
      errorToast(error);
      logger.sendErrorLog(`Nie udało się pobrać logów. Error: ${getErrorMessage(error)}`);
    },
  });

  const handlePreviousButtonClick = () => {
    setSearchParams({ page: String(pageParamValue - 1) });
  };

  const handleNextButtonClick = () => {
    setSearchParams({ page: String(pageParamValue + 1) });
  };

  const logsData = getLogsQueryData?.logs?.data;

  if (pageParamValue < 1) return <Navigate to={routes.menu} />;

  return (
    <ProtectedTabTemplate>
      {logsData && (logsData.length === DEFAULT_PAGE_SIZE || pageParamValue !== 1) && (
        <LogsPagination
          page={pageParamValue}
          disabledPreviousButton={pageParamValue < 2}
          disabledNextButton={logsData.length !== DEFAULT_PAGE_SIZE}
          onPreviousButtonClick={handlePreviousButtonClick}
          onNextButtonClick={handleNextButtonClick}
        />
      )}
      {!logsData && <Spinner />}
      {logsData && logsData.length === 0 && <NoItemsInformation text={t('texts.noLogs')} />}
      {logsData && logsData.length > 0 && (
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
      )}
      {logsData && logsData.length === DEFAULT_PAGE_SIZE && (
        <LogsPagination
          page={pageParamValue}
          disabledPreviousButton={pageParamValue < 2}
          disabledNextButton={logsData.length !== DEFAULT_PAGE_SIZE}
          onPreviousButtonClick={handlePreviousButtonClick}
          onNextButtonClick={handleNextButtonClick}
        />
      )}
    </ProtectedTabTemplate>
  );
};

export default LogsTab;
