// utils/chart.ts
import type { DataPoint } from "../types/chart";
// mock data functions
export function processSeriesData(data: DataPoint[]) {
  return data.reduce((acc, point) => {
    const key =
      point.series === "actual"
        ? "actual"
        : point.isCleaning
        ? `${point.series}Cleaning`
        : point.series;

    if (!acc[key]) {
      acc[key] = [];
    }

    const x = new Date(point.date).valueOf();

    if (key === "actual") {
      const exists = acc[key].some((p) => p.x === x);
      if (exists) return acc;
    }

    acc[key].push({
      x,
      y: point.value,
      color: point.color,
      series: point.series,
      originalSeries: point.series,
      isCleaning: point.isCleaning,
    });

    return acc;
  }, {} as Record<string, { x: number; y: number; color: string; series: string; originalSeries: string; isCleaning?: boolean }[]>);
}

export function flattenSeriesData(
  seriesData: Record<
    string,
    {
      x: number;
      y: number;
      color: string;
      series: string;
      originalSeries: string;
      isCleaning?: boolean;
    }[]
  >
) {
  return Object.entries(seriesData).flatMap(([key, points]) =>
    points.map((point) => ({
      ...point,
      displayName: key.includes("Cleaning")
        ? `${key.replace("Cleaning", "")} Cleaning`
        : key,
    }))
  );
}
