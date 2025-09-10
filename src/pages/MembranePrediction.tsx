/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar } from "lucide-react";
import MembraneChart from "../components/MembraneChart";

function generateMockData(
  startDate: string,
  numPoints: number,
  seriesNames: string[],
  startValue: number,
  noise: number,
  cleaningEvery = 20
) {
  const data: any[] = [];
  const start = new Date(startDate);

  // Tính số điểm cho mỗi series (chia đều timeline)
  const pointsPerSeries = Math.floor(numPoints / seriesNames.length);

  for (let i = 0; i < numPoints; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);

    // Xác định series nào nên có giá trị tại điểm này
    const seriesIndex = Math.floor(i / pointsPerSeries);
    const currentSeries =
      seriesNames[Math.min(seriesIndex, seriesNames.length - 1)];

    const point: Record<string, number | string | null> = {
      date: date.toISOString().split("T")[0],
    };

    // Khởi tạo tất cả series là null
    seriesNames.forEach((name) => {
      point[name] = null;
    });

    // Chỉ set giá trị cho series hiện tại
    if (seriesIndex < seriesNames.length) {
      const localIdx = i - seriesIndex * pointsPerSeries;
      const value = startValue - localIdx * 0.2 + (Math.random() - 0.5) * noise;
      point[currentSeries] = Number(value.toFixed(2));

      // Thêm cleaning event nếu cần
      if (i % cleaningEvery === 0) {
        point[`${currentSeries}Cleaning`] = point[currentSeries];
      }
    }

    data.push(point);
  }

  return data;
}

const permeabilityData = generateMockData(
  "2024-06-01",
  100,
  ["actual", "predicted", "optimized"],
  140,
  3,
  15
);
const tmpData = generateMockData(
  "2024-06-01",
  100,
  ["actual", "predicted"],
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
