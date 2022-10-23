import { Spinner, StackDivider, useDisclosure, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useErrorToast } from 'hooks';
import { getEmployeeName } from 'helpers';
import { useGetEmployeesQuery } from 'graphql/generated/schema';
import NoItemsInformation from 'components/NoItemsInformation/NoItemsInformation';
import { IWorker } from 'components/WorkerSelects/WorkerSelects';
import ProtectedTabTemplate from 'templates/ProtectedTabTemplate';
import EmployeeRow from 'components/EmployeeRow/EmployeeRow';
import { useState } from 'react';
import EmployeeDrawer from 'components/EmployeeDrawer/EmployeeDrawer';

const EmployeesManagementTab = () => {
  const errorToast = useErrorToast();
  const { t } = useTranslation();

  const {
    isOpen: isEmployeeDrawerOpen,
    onOpen: onEmployeeDrawerOpen,
    onClose: onEmployeeDrawerClose,
  } = useDisclosure();

  const [selectedEmployee, setSelectedEmployee] = useState<IWorker>();

  const { data: getEmployeesQueryData } = useGetEmployeesQuery({
    onError: (error) => {
      errorToast(error);
    },
  });

  const handleEmployeeDrawerOpen = (employee: IWorker) => {
    setSelectedEmployee(employee);
    onEmployeeDrawerOpen();
  };

  const handleEmployeeDrawerClose = () => {
    setSelectedEmployee(undefined);
    onEmployeeDrawerClose();
  };

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

          return (
            <EmployeeRow key={id} employee={employee} onEditButtonClick={() => handleEmployeeDrawerOpen(employee)} />
          );
        })}
      </VStack>
      <EmployeeDrawer employee={selectedEmployee} isOpen={isEmployeeDrawerOpen} onClose={handleEmployeeDrawerClose} />
    </ProtectedTabTemplate>
  );
};

export default EmployeesManagementTab;
