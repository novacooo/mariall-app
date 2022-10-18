import { monthNames } from 'constants/monthNames';

export interface IMonth {
  number: number;
  name: string;
}

export const getMonths = () => {
  const months: IMonth[] = [];

  for (let i = 0; i < 12; i += 1) {
    months.push({
      number: i + 1,
      name: monthNames[i],
    });
  }

  return months;
};
