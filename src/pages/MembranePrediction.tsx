/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar } from "lucide-react";
import MembraneChart from "../components/MembraneChart";

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
    Math.floor(totalDays * 0.5), // actual - 50%
    Math.floor(totalDays * 0.3), // predicted - 30%
    Math.floor(totalDays * 0.2), // optimized - 20%
  ];

  let currentDate = new Date(start);
  let dayCount = 0;

  for (let seriesIndex = 0; seriesIndex < series.length; seriesIndex++) {
    const currentSeries = series[seriesIndex];
    const seriesDays = daysPerSeries[seriesIndex];

    for (let i = 0; i < seriesDays; i++) {
      if (dayCount >= totalDays) break;

      const progress = dayCount / totalDays;
      const value =
        startValue -
        (startValue - endValue) * progress +
        (Math.random() - 0.5) * noise;

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
          series: currentSeries.name,
          isCleaning: true,
        });
      }

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
  145, // start value
  100, // end value
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
  30 // cleaning every 30 days
);

export default function MembranePrediction() {
  return (
    <div className="bg-bg-card mx-6 my-6">
      {/* Filters */}
      <div className="px-6 py-4 flex flex-wrap gap-4 items-center justify-start">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-icon" />
          <input
            type="date"
            className="border rounded-lg px-2 py-1 text-sm text-text-caption bg-background-input hover:border-gray-300 focus:outline-none"
            defaultValue="2024-06-01"
          />
          <span className="text-text-caption">→</span>
          <input
            type="date"
            className="border rounded-lg px-2 py-1 text-sm text-text-caption bg-background-input hover:border-gray-300 focus:outline-none"
            defaultValue="2025-06-01"
          />
        </div>
        <select className="rounded-lg px-3 py-1 text-sm text-text-caption border bg-background-input hover:border-gray-300 focus:outline-none">
          <option value="UF_2" className="text-text-caption">
            UF_Membrane_Train_2
          </option>
          <option value="UF_3" className="text-text-caption">
            UF_Membrane_Train_3
          </option>
        </select>
        <button className="ml-auto font-medium px-4 py-2 bg-button-bg text-text-header rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none">
          Submit
        </button>
      </div>

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
