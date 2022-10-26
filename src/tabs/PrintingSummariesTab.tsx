import { useRef, useState } from 'react';
import { Button, Spinner } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FiEye, FiEyeOff, FiPrinter } from 'react-icons/fi';
import { useReactToPrint } from 'react-to-print';

import WorkerSelects, { IWorkerSelectsData, WorkerSelectsHandle } from 'components/WorkerSelects/WorkerSelects';
import { useGetEmployeesQuery } from 'graphql/generated/schema';
import { useAppSelector, useErrorToast } from 'hooks';
import ProtectedTabTemplate from 'templates/ProtectedTabTemplate';
import SummariesTable from 'components/SummariesTable/SummariesTable';
import BetweenWrapper from 'components/BetweenWrapper/BetweenWrapper';
import ButtonsWrapper from 'components/ButtonsWrapper/ButtonsWrapper';
import { selectThemeAccentColor } from 'features/theme/themeSlice';
import { useLogger } from 'hooks/useLogger';
import { getErrorMessage } from 'helpers';

const PrintingSummariesTab = () => {
  const errorToast = useErrorToast();
  const { t } = useTranslation();
  const logger = useLogger();

  const tableRef = useRef<HTMLDivElement>(null);
  const workerSelectsRef = useRef<WorkerSelectsHandle>(null);

  const themeAccentColor = useAppSelector(selectThemeAccentColor);

  const [showPrices, setShowPrices] = useState<boolean>(false);
  const [workerSelectsData, setWorkerSelectsData] = useState<IWorkerSelectsData>();
  const [isSummary, setIsSummary] = useState<boolean>(false);
  const [isPrintLoading, setIsPrintLoading] = useState<boolean>(false);

  const { data: getEmployeesQueryData } = useGetEmployeesQuery({
    onCompleted: () => {
      workerSelectsRef.current?.resetSelects();
    },
    onError: (error) => {
      errorToast(error);
      logger.sendErrorLog(`Nie udało się pobrać pracowników. Error: ${getErrorMessage(error)}`);
    },
  });

  const handlePrintButtonClick = useReactToPrint({
    content: () => tableRef.current,
    onBeforeGetContent: () => setIsPrintLoading(true),
    onAfterPrint: () => setIsPrintLoading(false),
  });

  const handleShowPricesButtonClick = () => {
    setShowPrices((prevState) => !prevState);
  };

  return (
    <ProtectedTabTemplate>
      <BetweenWrapper>
        {getEmployeesQueryData ? (
          <WorkerSelects
            ref={workerSelectsRef}
            getEmployeesQueryData={getEmployeesQueryData}
            setWorkerSelectsData={setWorkerSelectsData}
          />
        ) : (
          <Spinner />
        )}
        {workerSelectsData && isSummary && (
          <ButtonsWrapper>
            <Button
              rightIcon={showPrices ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              onClick={handleShowPricesButtonClick}
            >
              {showPrices ? t('buttons.hidePrices') : t('buttons.showPrices')}
            </Button>
            <Button
              colorScheme={themeAccentColor}
              onClick={handlePrintButtonClick}
              rightIcon={<FiPrinter />}
              isLoading={isPrintLoading}
              loadingText={t('loading.printing')}
            >
              {t('buttons.printSummary')}
            </Button>
          </ButtonsWrapper>
        )}
      </BetweenWrapper>
      {workerSelectsData && (
        <SummariesTable
          employee={workerSelectsData.worker}
          year={workerSelectsData.year}
          month={workerSelectsData.month}
          showPrices={showPrices}
          setIsSummary={setIsSummary}
          tableRef={tableRef}
        />
      )}
    </ProtectedTabTemplate>
  );
};

export default PrintingSummariesTab;
