import { Spinner, StackDivider, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useErrorToast } from 'hooks';
import { getEmployeeName } from 'helpers';
import { useGetEmployeesQuery } from 'graphql/generated/schema';
import NoItemsInformation from 'components/NoItemsInformation/NoItemsInformation';
import { IWorker } from 'components/WorkerSelects/WorkerSelects';
import ProtectedTabTemplate from 'templates/ProtectedTabTemplate';
import EmployeeCard from 'components/EmployeeCard/EmployeeCard';

const EmployeesManagementTab = () => {
  const errorToast = useErrorToast();
  const { t } = useTranslation();

  const { data: getEmployeesQueryData } = useGetEmployeesQuery({
    onError: (error) => {
      errorToast(error);
    },
  });

  const employeesData = getEmployeesQueryData?.employees?.data;

  if (!employeesData) return <Spinner />;

  if (employeesData.length === 0) return <NoItemsInformation text={t('texts.noEmployees')} />;

  return (
    <ProtectedTabTemplate>
      <VStack maxW={{ md: 500 }} align="stretch" divider={<StackDivider />}>
        {employeesData.map(({ id, attributes }) => {
          if (!id || !attributes) return null;

          const { firstName, lastName } = attributes;
          const employeeName = getEmployeeName(firstName, lastName);
          const employee: IWorker = { id, name: employeeName };

          return <EmployeeCard key={id} employee={employee} />;
        })}
      </VStack>
    </ProtectedTabTemplate>
  );
};

export default EmployeesManagementTab;
