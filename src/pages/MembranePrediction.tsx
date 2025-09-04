import MembraneChart from "../components/MembraneChart";

const permeabilityData = [
  { date: "Jun 10", actual: 130, predicted: 135, optimized: 128 },
  { date: "Jun 15", actual: 125, predicted: 132, optimized: 122 },
  { date: "Jun 20", actual: 120, predicted: 129, optimized: 118 },
  { date: "Jun 25", actual: 118, predicted: 127, optimized: 115 },
  { date: "Jun 30", actual: 115, predicted: 124, optimized: 112 },
];

const tmpData = [
  { date: "Jun 10", actual: 35, predicted: 30, optimized: 32 },
  { date: "Jun 15", actual: 34, predicted: 29, optimized: 31 },
  { date: "Jun 20", actual: 33, predicted: 28, optimized: 30 },
  { date: "Jun 25", actual: 36, predicted: 29, optimized: 32 },
  { date: "Jun 30", actual: 38, predicted: 31, optimized: 33 },
];

export default function MembranePrediction() {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Filters */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 flex flex-wrap gap-4 items-center justify-center">
        <div className="flex items-center gap-2">
          <span className="font-medium text-blue-700">06/01/2024</span>
          <span className="text-gray-500">→</span>
          <span className="font-medium text-blue-700">06/30/2024</span>
        </div>
        <select className="border rounded-lg px-4 py-2 text-sm bg-white text-gray-700 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none">
          <option>UF_Membrane_Train_2</option>
          <option>UF_Membrane_Train_3</option>
        </select>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Submit
        </button>
      </div>

      {/* Charts */}
      <div className="space-y-8">
        <MembraneChart
          data={permeabilityData}
          title="Permeability vs Predicted Permeability"
          metricName="Permeability"
        />
        <MembraneChart
          data={tmpData}
          title="TMP vs Predicted TMP"
          metricName="TMP"
        />
      </div>
    </div>
  );
}