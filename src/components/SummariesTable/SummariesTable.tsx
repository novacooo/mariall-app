import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Spinner, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';

import { useErrorToast } from 'hooks';
import NoItemsInformation from 'components/NoItemsInformation/NoItemsInformation';
import { useGetQuantitiesLazyQuery } from 'graphql/generated/schema';

interface ISummary {
  productId: string;
  productCode: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  totalValue: number;
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

  const bgColor = useColorModeValue('white', 'gray.800');

  const [summaries, setSummaries] = useState<ISummary[]>();

  const [getQuantities] = useGetQuantitiesLazyQuery({
    onError: (error) => errorToast(error),
  });

  const fetchData = async () => {
    const getQuantitiesResponse = await getQuantities({ variables: { workerId: employeeId, year, month } });
    const quantitiesData = getQuantitiesResponse.data?.quantities?.data;

    const newSummaries: ISummary[] = [];

    quantitiesData?.forEach(({ attributes: quantityAttributes }) => {
      const productId = quantityAttributes?.product?.data?.id;
      const productAttributes = quantityAttributes?.product?.data?.attributes;

      if (!quantityAttributes || !productId || !productAttributes) return;

      const { quantity: productQuantity } = quantityAttributes;
      const { code: productCode, name: productName, price: productPrice } = productAttributes;

      const totalValue = Number((productPrice * productQuantity).toFixed(2));

      newSummaries.push({ productId, productCode, productName, productPrice, productQuantity, totalValue });
    });

    setSummaries(newSummaries);
  };

  useEffect(() => {
    void fetchData();
  }, [employeeId, year, month]);

  if (!summaries) return <Spinner />;

  if (summaries.length === 0) return <NoItemsInformation text={t('texts.noSummary')} />;

  return (
    <Box w="full" overflowX="auto" bgColor={bgColor} borderWidth={1} rounded="md">
      <TableContainer>
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th>{t('tables.summariesProductId')}</Th>
              <Th>{t('tables.summariesProductCode')}</Th>
              <Th>{t('tables.summariesProductName')}</Th>
              {showPrices && (
                <>
                  <Th isNumeric>{t('tables.summariesProductPrice')}</Th>
                  <Th isNumeric>{t('tables.summariesProductQuantity')}</Th>
                  <Th isNumeric>{t('tables.summariesTotalValue')}</Th>
                </>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {summaries.map(({ productId, productCode, productName, productPrice, productQuantity, totalValue }) => (
              <Tr key={`${productId}-${productCode}`}>
                <Td>{productId}</Td>
                <Td>{productCode}</Td>
                <Td>{productName}</Td>
                {showPrices && (
                  <>
                    <Td isNumeric>{`${productPrice} ${t('texts.currency')}`}</Td>
                    <Td isNumeric>{productQuantity}</Td>
                    <Td isNumeric>{`${totalValue} ${t('texts.currency')}`}</Td>
                  </>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SummariesTable;
