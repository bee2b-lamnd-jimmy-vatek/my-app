/* eslint-disable @typescript-eslint/no-explicit-any */
import MembraneChart from "../components/chart/MembraneChart";
import MembranePredictionFilter from "../components/filter/MembranePredictionFilter";

function generateMockData(
  startDate: string,
  endDate: string,
  series: Array<{ name: string; color: string }>,
  startValue: number,
  endValue: number,
  noise: number,
  cleaningEvery = 30
) {
  const data: Array<{
    date: string;
    value: number;
    color: string;
    series: string;
    isCleaning?: boolean;
  }> = [];

  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalDays = Math.floor(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  const daysPerSeries = [
    Math.floor(totalDays * 0.5),
    Math.floor(totalDays * 0.3),
    Math.floor(totalDays * 0.2),
  ];

  const currentDate = new Date(start);
  let dayCount = 0;

  for (let seriesIndex = 0; seriesIndex < series.length; seriesIndex++) {
    const currentSeries = series[seriesIndex];
    const seriesDays = daysPerSeries[seriesIndex];

    let lastValue = startValue;

    for (let i = 0; i < seriesDays; i++) {
      if (dayCount >= totalDays) break;

      const progress = dayCount / totalDays;

      // Random walk + linear trend + sinusoidal fluctuation
      const trend = startValue - (startValue - endValue) * progress;
      const fluctuation = Math.sin(dayCount / 10 + seriesIndex) * noise; // sin wave
      const randomNoise = (Math.random() - 0.5) * noise;

      const value = Math.max(
        0,
        lastValue * 0.9 + trend * 0.1 + fluctuation + randomNoise
      );

      data.push({
        date: currentDate.toISOString().split("T")[0],
        value: Number(value.toFixed(2)),
        color: currentSeries.color,
        series: currentSeries.name,
      });

      if (currentSeries.name !== "actual" && dayCount % cleaningEvery === 0) {
        data.push({
          date: currentDate.toISOString().split("T")[0],
          value: Number(value.toFixed(2)),
          color:
            currentSeries.name === "predicted" ? "lightblue" : "lightgreen",
          series:
            currentSeries.name === "predicted"
              ? "Predicted Cleaning Event"
              : "Optimized Cleaning Event",
          isCleaning: true,
        });
      }

      lastValue = value;
      currentDate.setDate(currentDate.getDate() + 1);
      dayCount++;
    }
  }

  return data;
}

const permeabilityData = generateMockData(
  "2024-06-01",
  "2025-06-01",
  [
    { name: "actual", color: "red" },
    { name: "predicted", color: "blue" },
    { name: "optimized", color: "green" },
  ],
  200, // start value
  30, // end value
  3, // noise
  40 // cleaning every 45 days
);

const tmpData = generateMockData(
  "2024-06-01",
  "2025-06-01",
  [
    { name: "actual", color: "red" },
    { name: "predicted", color: "blue" },
  ],
  40, // start value
  25, // end value
  1, // noise
  20 // cleaning every 30 days
);

export default function MembranePrediction() {
  return (
    <div className="bg-bg-card mx-6 my-6">
      <MembranePredictionFilter />

      {/* Charts */}
      <MembraneChart
        data={permeabilityData}
        title="Permeability vs Predicted Permeability"
        metricName="Permeability"
        domain={[90, 150]}
      />
      <MembraneChart
        data={tmpData}
        title="TMP vs Predicted TMP"
        metricName="TMP"
        domain={[20, 45]}
      />
    </div>
  );
}
