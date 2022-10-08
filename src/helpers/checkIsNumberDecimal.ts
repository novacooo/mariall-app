export const checkIsNumberDecimal = (number: number | undefined) => {
  const patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;

  if (number !== undefined) {
    return patternTwoDigisAfterComma.test(number.toString());
  }

  return true;
};
