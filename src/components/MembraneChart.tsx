import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  date: string;
  actual: number;
  predicted: number;
  optimized: number;
}

interface MembraneChartProps {
  data: ChartData[];
  title: string;
  metricName: string;
}

export default function MembraneChart({ data, title, metricName }: MembraneChartProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full">
      <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">
        {title}
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            tick={{ fill: '#6B7280' }}
            tickLine={{ stroke: '#6B7280' }}
          />
          <YAxis
            tick={{ fill: '#6B7280' }}
            tickLine={{ stroke: '#6B7280' }}
          />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#DC2626"
            strokeWidth={2}
            name={`Actual ${metricName}`}
          />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#2563EB"
            strokeWidth={2}
            name={`Predicted ${metricName}`}
          />
          <Line
            type="monotone"
            dataKey="optimized"
            stroke="#059669"
            strokeWidth={2}
            name={`Optimized ${metricName}`}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}