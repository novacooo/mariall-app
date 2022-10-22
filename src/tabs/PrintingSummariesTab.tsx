import { useRef, useState } from 'react';
import { Button, Spinner } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FiEye, FiEyeOff, FiPrinter } from 'react-icons/fi';

import WorkerSelects, { IWorkerSelectsData, WorkerSelectsHandle } from 'components/WorkerSelects/WorkerSelects';
import { useGetEmployeesQuery } from 'graphql/generated/schema';
import { useAppSelector, useErrorToast } from 'hooks';
import ProtectedTabTemplate from 'templates/ProtectedTabTemplate';
import SummariesTable from 'components/SummariesTable/SummariesTable';
import BetweenWrapper from 'components/BetweenWrapper/BetweenWrapper';
import ButtonsWrapper from 'components/ButtonsWrapper/ButtonsWrapper';
import { selectThemeAccentColor } from 'features/theme/themeSlice';

const PrintingSummariesTab = () => {
  const errorToast = useErrorToast();
  const { t } = useTranslation();

  const workerSelectsRef = useRef<WorkerSelectsHandle>(null);

  const themeAccentColor = useAppSelector(selectThemeAccentColor);

  const [showPrices, setShowPrices] = useState<boolean>(false);
  const [workerSelectsData, setWorkerSelectsData] = useState<IWorkerSelectsData>();

  const { data: getEmployeesQueryData } = useGetEmployeesQuery({
    onError: (error) => {
      errorToast(error);
    },
  });

  const handleShowPricesButtonClick = () => {
    setShowPrices((prevState) => !prevState);
  };

  const handlePrintButtonClick = () => {
    // handle click
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
        {workerSelectsData && (
          <ButtonsWrapper>
            <Button
              rightIcon={showPrices ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              onClick={handleShowPricesButtonClick}
            >
              {showPrices ? t('buttons.hidePrices') : t('buttons.showPrices')}
            </Button>
            <Button colorScheme={themeAccentColor} onClick={handlePrintButtonClick} rightIcon={<FiPrinter />}>
              {t('buttons.printSummary')}
            </Button>
          </ButtonsWrapper>
        )}
      </BetweenWrapper>
      {workerSelectsData && (
        <SummariesTable
          employeeId={workerSelectsData.worker.id}
          year={workerSelectsData.year}
          month={workerSelectsData.month.number}
          showPrices={showPrices}
        />
      )}
    </ProtectedTabTemplate>
  );
};

export default PrintingSummariesTab;
