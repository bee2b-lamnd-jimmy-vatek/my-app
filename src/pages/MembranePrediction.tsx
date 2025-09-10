/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar } from "lucide-react";
import MembraneChart from "../components/MembraneChart";

function generateMockData(
  startDate: string,
  numPoints: number,
  series: Array<{ name: string; color: string }>,
  startValue: number,
  noise: number,
  cleaningEvery = 50
) {
  const data: Array<{
    date: string;
    value: number;
    color: string;
    series: string;
    isCleaning?: boolean;
  }> = [];

  const start = new Date(startDate);
  const pointsPerSeries = Math.floor(numPoints / series.length);

  for (let i = 0; i < numPoints; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const seriesIndex = Math.floor(i / pointsPerSeries);

    // Skip if we've gone beyond our series array
    if (seriesIndex >= series.length || seriesIndex > 2) break;

    const currentSeries = series[seriesIndex];
    const localIdx = i - seriesIndex * pointsPerSeries;
    const value = startValue - localIdx * 0.2 + (Math.random() - 0.5) * noise;

    // Add main data point
    data.push({
      date: date.toISOString().split("T")[0],
      value: Number(value.toFixed(2)),
      color: currentSeries.color,
      series: currentSeries.name,
    });

    // Add cleaning event if needed
    if (i % cleaningEvery === 0) {
      data.push({
        date: date.toISOString().split("T")[0],
        value: Number(value.toFixed(2)),
        color:
          currentSeries.name === "predicted"
            ? "lightblue"
            : currentSeries.name === "optimized"
            ? "lightgreen"
            : currentSeries.color,
        series: currentSeries.name,
        isCleaning: true,
      });
    }
  }

  return data;
}

// Example usage with adjusted number of points
const permeabilityData = generateMockData(
  "2024-06-01",
  1000,
  [
    { name: "actual", color: "red" },
    { name: "predicted", color: "blue" },
    { name: "optimized", color: "green" },
  ],
  140,
  3,
  30
);

const tmpData = generateMockData(
  "2024-06-01",
  200,
  [
    { name: "actual", color: "red" },
    { name: "predicted", color: "blue" },
  ],
  35,
  1,
  12
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
            defaultValue="2024-09-15"
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
        domain={[100, 145]}
      />
      <MembraneChart
        data={tmpData}
        title="TMP vs Predicted TMP"
        metricName="TMP"
        domain={[25, 40]}
      />
    </div>
  );
}
