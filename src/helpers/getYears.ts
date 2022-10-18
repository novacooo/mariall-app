export const getYears = () => {
  const range = 2;
  const date = new Date();
  const year = date.getFullYear();
  const startYear = year - range;
  const endYear = year + range;

  const years: number[] = [];

  for (let i = startYear; i < endYear; i += 1) {
    years.push(i);
  }

  return years;
};
