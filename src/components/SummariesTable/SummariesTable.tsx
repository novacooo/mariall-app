import { RefObject, useEffect, useState } from 'react';
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
  Text,
  Flex,
  Heading,
} from '@chakra-ui/react';

import { useErrorToast } from 'hooks';
import NoItemsInformation from 'components/NoItemsInformation/NoItemsInformation';
import { useGetQuantitiesLazyQuery } from 'graphql/generated/schema';
import { IWorker } from 'components/WorkerSelects/WorkerSelects';
import { IMonth } from 'helpers';

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

interface PrintInfoRowProps {
  header: string;
  info: string | number;
}

interface SummariesTableProps {
  employee: IWorker;
  year: number;
  month: IMonth;
  showPrices?: boolean;
  tableRef?: RefObject<HTMLDivElement>;
  setIsSummary?: (param: boolean) => void;
}

const PrintInfoText = ({ header, info }: PrintInfoRowProps) => (
  <Text fontSize="sm">
    <Text as="span" mr={1} fontWeight="semibold">
      {`${header}:`}
    </Text>
    {info}
  </Text>
);

const SummariesTable = ({ employee, year, month, showPrices, tableRef, setIsSummary }: SummariesTableProps) => {
  const { t } = useTranslation();
  const errorToast = useErrorToast();

  const bgColor = useColorModeValue('white', 'gray.800');

  const [summaries, setSummaries] = useState<ISummary[]>();
  const [sums, setSums] = useState<ISums>();

  const [getQuantities] = useGetQuantitiesLazyQuery({
    onError: (error) => errorToast(error),
  });

  const fetchData = async () => {
    const getQuantitiesResponse = await getQuantities({
      variables: {
        workerId: employee.id,
        year,
        month: month.number,
      },
    });
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

    if (setIsSummary && newSummaries.length !== 0) setIsSummary(true);
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

    pricesSum = Number(pricesSum.toFixed(2));
    totalValuesSum = Number(totalValuesSum.toFixed(2));

    setSums({ pricesSum, quantitiesSum, totalValuesSum });
  };

  useEffect(() => {
    if (setIsSummary) setIsSummary(false);
    void fetchData();
  }, [employee, year, month]);

  useEffect(() => {
    if (!summaries || summaries.length === 0) return;
    calculateSums();
  }, [summaries]);

  if (!summaries) return <Spinner />;

  if (summaries.length === 0) return <NoItemsInformation text={t('texts.noSummary')} />;

  return (
    <Box w="full" overflowX="auto" bgColor={bgColor} borderWidth={1} rounded="md">
      <TableContainer ref={tableRef}>
        <Flex className="show-on-print-only" display="none" m={4} direction="column" gap={1}>
          <Heading as="h4" size="sm" textAlign="center">
            {t('texts.monthSummary')}
          </Heading>
          <PrintInfoText header={t('texts.employee')} info={employee.name} />
          <PrintInfoText header={t('texts.year')} info={year} />
          <PrintInfoText header={t('texts.month')} info={t(`months.${month.name}`)} />
        </Flex>
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
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
            {summaries.map(({ productCode, productName, productPrice, productQuantity, totalValue }) => (
              <Tr key={productCode}>
                <Td>{productCode}</Td>
                <Td maxW={32} overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
                  {productName}
                </Td>
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
                <Th isNumeric>{sums.quantitiesSum}</Th>
                {showPrices && (
                  <>
                    <Th isNumeric>{`${sums.pricesSum} ${t('texts.currency')}`}</Th>
                    <Th isNumeric>{`${sums.totalValuesSum} ${t('texts.currency')}`}</Th>
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
