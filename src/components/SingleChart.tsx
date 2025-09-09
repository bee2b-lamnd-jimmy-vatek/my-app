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

interface DataPoint {
  x: number;
  y: number;
}

interface SingleChartProps {
  config: {
    key: string;
    data: DataPoint[];
    color: string;
    label: string;
    domain: [number, number];
  };
}

const SingleChart = memo(({ config }: SingleChartProps) => {
  return (
    <div style={{ width: "100%", height: 200, color: "var(--text-body)" }}>
      <ResponsiveContainer>
        <ScatterChart
          margin={{
            top: 10,
            right: 30,
            left: 40,
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
            formatter={(value) => [`${Number(value).toFixed(2)}`, config.label]}
            labelFormatter={(label) =>
              new Date(Number(label)).toLocaleDateString()
            }
          />
          <Legend align="right" verticalAlign="top" />
          <Scatter
            name={config.label}
            data={config.data}
            fill={config.color}
            r={2}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
});

SingleChart.displayName = "SingleChart";

export default SingleChart;
