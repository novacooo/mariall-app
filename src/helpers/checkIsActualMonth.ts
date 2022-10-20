export const checkIsActualMonth = (year: number, month: number) => {
  const date = new Date();

  const actualYear = date.getFullYear();
  const actualMonth = date.getMonth() + 1;

  return actualYear === year && actualMonth === month;
};
