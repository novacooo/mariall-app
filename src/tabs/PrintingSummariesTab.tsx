import { useRef, useState } from 'react';
import { Spinner, Text } from '@chakra-ui/react';

import WorkerSelects, { IWorkerSelectsData, WorkerSelectsHandle } from 'components/WorkerSelects/WorkerSelects';
import { useGetEmployeesQuery } from 'graphql/generated/schema';
import { useErrorToast } from 'hooks';
import ProtectedTabTemplate from 'templates/ProtectedTabTemplate';

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
      {workerSelectsData && <Text>Selected</Text>}
    </ProtectedTabTemplate>
  );
};

export default PrintingSummariesTab;
