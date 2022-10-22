import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Spinner } from '@chakra-ui/react';

import { useErrorToast } from 'hooks';
import NoItemsInformation from 'components/NoItemsInformation/NoItemsInformation';
import { useGetQuantitiesLazyQuery } from 'graphql/generated/schema';

interface ISummary {
  productId: string;
  productName: string;
  productQuantity: number;
  productPrice: number;
}

interface SummariesTableProps {
  employeeId: string;
  year: number;
  month: number;
  showPrices?: boolean;
}

const SummariesTable = ({ employeeId, year, month, showPrices }: SummariesTableProps) => {
  const { t } = useTranslation();
  const errorToast = useErrorToast();

  const [summaries, setSummaries] = useState<ISummary[]>([]);

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

  if (!summaries) return <Spinner />;

  if (summaries.length === 0) return <NoItemsInformation text={t('texts.noSummary')} />;

  return (
    <div>
      <p>SummariesTable</p>
    </div>
  );
};

export default SummariesTable;
