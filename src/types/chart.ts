export type DataPoint = {
  date: string;
  value: number;
  color: string;
  series: string;
  isCleaning?: boolean;
};