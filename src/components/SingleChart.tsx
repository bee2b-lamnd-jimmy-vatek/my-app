import { memo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatTooltip } from "./tooltips/OperationChartTooltip";

interface SingleChartProps {
  config: {
    key: string;
    data: { x: number; y: number }[];
    color: string;
    label: string;
    domain: [number, number];
  };
}

const SingleChart = memo(({ config }: SingleChartProps) => {
  return (
    <div
      style={{ width: "100%", height: 280, color: "var(--text-body)" }}
      className="mb-6"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-text-body">
            {config.label}
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="x"
              type="number"
              domain={["dataMin", "dataMax"]}
              tickFormatter={(unix) => new Date(unix).toLocaleDateString()}
              tick={{
                fill: "var(--text-body)",
                fontSize: 12,
              }}
            />
            <YAxis
              dataKey="y"
              domain={config.domain}
              tick={{
                fill: "var(--text-body)",
                fontSize: 12,
              }}
            />
            <Tooltip
              formatter={(value: number, name: string) =>
                formatTooltip(value, name, config.label)
              }
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "0.375rem",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
              wrapperStyle={{
                transition: "none",
              }}
              cursor={{ stroke: "#ccc", strokeWidth: 1 }}
            />
            <Legend />
            <Scatter
              name={config.label}
              data={config.data}
              fill={config.color}
              r={3}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

SingleChart.displayName = "SingleChart";

export default SingleChart;
