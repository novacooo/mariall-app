import { useGetQuantitiesLazyQuery } from 'graphql/generated/schema';
import { useErrorToast } from 'hooks';
import { useEffect } from 'react';

interface SummariesTableProps {
  employeeId: string;
  year: number;
  month: number;
}

const SummariesTable = ({ employeeId, year, month }: SummariesTableProps) => {
  const errorToast = useErrorToast();

  const [getQuantities] = useGetQuantitiesLazyQuery({
    onError: (error) => errorToast(error),
  });

  const fetchData = async () => {
    const getQuantitiesResponse = await getQuantities({ variables: { workerId: employeeId, year, month } });
    const quantitiesData = getQuantitiesResponse.data?.quantities?.data;

    console.log(quantitiesData);
  };

  useEffect(() => {
    void fetchData();
  }, [employeeId, year, month]);

  return (
    <div>
      <p>SummariesTable</p>
    </div>
  );
};

export default SummariesTable;
