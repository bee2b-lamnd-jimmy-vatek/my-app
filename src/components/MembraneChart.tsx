/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useMemo } from "react";

import { flattenSeriesData, processSeriesData } from "../utils/chart";
import MembraneChartLegend from "./legends/MembraneChartLegend";
import type { DataPoint } from "../types/chart";
import {
  formatTooltip,
  formatTooltipLabel,
} from "./tooltips/MembraneChartTooltip";

type MembraneChartProps = {
  data: DataPoint[];
  title: string;
  metricName: string;
  domain?: [number, number];
};

export default function MembraneChart({
  data,
  title,
  metricName,
  domain,
}: MembraneChartProps) {
  const seriesData = useMemo(() => processSeriesData(data), [data]);
  const flatPoints = useMemo(() => flattenSeriesData(seriesData), [seriesData]);

  const CustomPointShape = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload.isCleaning) {
      return (
        <svg x={cx - 7} y={cy - 14} width={14} height={14}>
          <polygon points="0,0 14,0 7,14" fill={payload.color} />
        </svg>
      );
    }
    return <circle cx={cx} cy={cy} r={4} fill={payload.color} />;
  };

  return (
    <div className="p-4 m-4 bg-white rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4 ml-4">{title}</h2>

      <ResponsiveContainer width="100%" height={350}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            type="number"
            scale="time"
            domain={["auto", "auto"]}
            tickFormatter={(unix) =>
              new Date(unix).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })
            }
          />
          <YAxis
            dataKey="y"
            domain={domain ?? ["dataMin", "dataMax"]}
            label={{
              value: metricName,
              angle: -90,
              position: "insideLeft",
              offset: -25,
              style: {
                textAnchor: "middle",
              },
            }}
          />
          <Tooltip
            formatter={formatTooltip}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.375rem",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Legend content={MembraneChartLegend} />

          <Scatter
            name={metricName}
            data={flatPoints}
            shape={CustomPointShape}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
