import { useRef, useState } from 'react';
import { Spinner } from '@chakra-ui/react';

import WorkerSelects, { IWorkerSelectsData, WorkerSelectsHandle } from 'components/WorkerSelects/WorkerSelects';
import { useGetEmployeesQuery } from 'graphql/generated/schema';
import { useErrorToast } from 'hooks';
import ProtectedTabTemplate from 'templates/ProtectedTabTemplate';
import SummariesTable from 'components/SummariesTable/SummariesTable';

const PrintingSummariesTab = () => {
  const errorToast = useErrorToast();
  const workerSelectsRef = useRef<WorkerSelectsHandle>(null);

  const [workerSelectsData, setWorkerSelectsData] = useState<IWorkerSelectsData>();

  const { data: getEmployeesQueryData } = useGetEmployeesQuery({
    onError: (error) => {
      errorToast(error);
    },
  });

  return (
    <ProtectedTabTemplate>
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
        <SummariesTable
          employeeId={workerSelectsData.worker.id}
          year={workerSelectsData.year}
          month={workerSelectsData.month.number}
        />
      )}
    </ProtectedTabTemplate>
  );
};

export default PrintingSummariesTab;
