import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';

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

interface ISums {
  pricesSum: number;
  quantitiesSum: number;
  totalValuesSum: number;
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
  const [sums, setSums] = useState<ISums>();

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

  const calculateSums = () => {
    let pricesSum = 0;
    let quantitiesSum = 0;
    let totalValuesSum = 0;

    summaries?.forEach(({ productPrice, productQuantity, totalValue }) => {
      pricesSum += productPrice;
      quantitiesSum += productQuantity;
      totalValuesSum += totalValue;
    });

    setSums({ pricesSum, quantitiesSum, totalValuesSum });
  };

  useEffect(() => {
    void fetchData();
  }, [employeeId, year, month]);

  useEffect(() => {
    if (!summaries || summaries.length === 0) return;
    calculateSums();
  }, [summaries]);

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
              <Th isNumeric>{t('tables.summariesProductQuantity')}</Th>
              {showPrices && (
                <>
                  <Th isNumeric>{t('tables.summariesProductPrice')}</Th>
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
                <Td isNumeric>{productQuantity}</Td>
                {showPrices && (
                  <>
                    <Td isNumeric>{`${productPrice} ${t('texts.currency')}`}</Td>
                    <Td isNumeric>{`${totalValue} ${t('texts.currency')}`}</Td>
                  </>
                )}
              </Tr>
            ))}
          </Tbody>
          {sums && (
            <Tfoot>
              <Tr>
                <Th />
                <Th />
                <Th />
                <Th isNumeric>{`${t('tables.summariesQuantitiesSum')}: ${sums.quantitiesSum}`}</Th>
                {showPrices && (
                  <>
                    <Th isNumeric>{`${t('tables.summariesPricesSum')}: ${sums.pricesSum} ${t('texts.currency')}`}</Th>
                    <Th isNumeric>{`${t('tables.summariesTotalValuesSum')}: ${sums.totalValuesSum} ${t(
                      'texts.currency',
                    )}`}</Th>
                  </>
                )}
              </Tr>
            </Tfoot>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SummariesTable;
