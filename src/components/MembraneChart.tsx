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
import { useState, useMemo } from "react";

type DataPoint = {
  date: string;
  value: number;
  color: string;
  series: string;
  isCleaning?: boolean;
};

type MembraneChartProps = {
  data: DataPoint[];
  title: string;
  metricName: string;
  domain?: [number, number];
};

function TriangleLegend() {
  // Define legend items manually
  const legendItems = [
    { label: "Actual Permeability", color: "#e53e3e", isCleaning: false },
    { label: "Predicted Permeability", color: "#3182ce", isCleaning: false },
    { label: "Optimized Permeability", color: "#38a169", isCleaning: false },
    { label: "Predicted Cleaning Events", color: "#90cdf4", isCleaning: true },
    { label: "Optimized Cleaning Events", color: "#68d391", isCleaning: true },
  ];

  return (
    <ul className="flex items-center justify-center">
      {legendItems.map((item, index) => (
        <li
          key={`legend-item-${index}`}
          style={{ marginRight: 16, display: "flex", alignItems: "center" }}
        >
          <svg width={14} height={14} style={{ marginRight: 4 }}>
            {item.isCleaning ? (
              <polygon points="0,0 14,0 7,14" fill={item.color} />
            ) : (
              <circle cx={7} cy={7} r={6} fill={item.color} />
            )}
          </svg>
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

// Simple downsampling function
const downsampleData = (data: any[], threshold: number) => {
  if (data.length <= threshold) return data;

  const everyNth = Math.ceil(data.length / threshold);
  return data.filter((_, index) => index % everyNth === 0);
};

// Custom tooltip formatter
const formatTooltip = (value: number, name: string, props: any) => {
  if (name === "x") {
    // Format x as date
    return [
      new Date(value).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    ];
  }
  if (name === "y") {
    // Format y as value
    const seriesName = props.payload?.series || name;
    return [`${Number(value).toFixed(2)}`, seriesName];
  }
  return [value, name];
};

// Custom label formatter
const formatTooltipLabel = (label: number) => {
  return new Date(label).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function MembraneChart({
  data,
  title,
  metricName,
  domain,
}: MembraneChartProps) {
  const [showOriginal] = useState(false);
  const [threshold] = useState(200);

  // Memoize series data processing
  const seriesData = useMemo(() => {
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
        if (exists) {
          return acc;
        }
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
  }, [data]);

  // Memoize downsampled data
  const displayData = useMemo(() => {
    return showOriginal
      ? seriesData
      : Object.entries(seriesData).reduce((acc, [key, points]) => {
          acc[key] = downsampleData(points, threshold);
          return acc;
        }, {} as Record<string, { x: number; y: number; color: string; series: string; originalSeries: string; isCleaning?: boolean }[]>);
  }, [seriesData, showOriginal, threshold]);

  // Flatten all points into a single array
  const flatPoints = Object.entries(displayData).flatMap(([key, points]) =>
    points.map((point) => ({
      ...point,
      displayName: key.includes("Cleaning")
        ? `${key.replace("Cleaning", "")} Cleaning`
        : key,
    }))
  );

  const CustomPointShape = (props: any) => {
    const { cx, cy, payload } = props;
    // Upside-down triangle with tip at (cx, cy)
    if (payload.isCleaning) {
      return (
        <svg x={cx - 7} y={cy - 14} width={14} height={14}>
          {/* Tip at (7,14) aligns with (cx,cy) */}
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
            labelFormatter={formatTooltipLabel}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.375rem",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Legend content={TriangleLegend} />

          {/* Render main series */}
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
