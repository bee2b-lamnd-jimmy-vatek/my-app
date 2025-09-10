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
  type LegendProps,
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

function TriangleLegend(props: LegendProps) {
  const { payload } = props;

  return (
    <ul className="flex items-center justify-center">
      {payload?.map((entry, index) => {
        const label = entry?.value ?? "";

        const isCleaning =
          typeof label === "string" && label.toLowerCase().includes("cleaning");

        return (
          <li
            key={`item-${index}`}
            style={{ marginRight: 16, display: "flex", alignItems: "center" }}
          >
            <svg width={14} height={14} style={{ marginRight: 4 }}>
              {isCleaning ? (
                <polygon points="7,0 14,14 0,14" fill={entry.color} />
              ) : (
                <circle cx={7} cy={7} r={6} fill={entry.color} />
              )}
            </svg>
            <span>{label}</span>
          </li>
        );
      })}
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
  const seriesName = props.payload?.series || name;
  return [`${Number(value).toFixed(2)}`, seriesName];
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
  const [showOriginal, setShowOriginal] = useState(false);
  const [threshold, setThreshold] = useState(200);

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
        originalSeries: point.series, // Giữ lại thông tin series gốc
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

  // Calculate compression ratio
  const { totalOriginalPoints, totalDownsampledPoints, compressionRatio } =
    useMemo(() => {
      const totalOriginal = Object.values(seriesData).reduce(
        (sum, points) => sum + points.length,
        0
      );
      const totalDownsampled = Object.values(displayData).reduce(
        (sum, points) => sum + points.length,
        0
      );
      const ratio = ((1 - totalDownsampled / totalOriginal) * 100).toFixed(1);

      return {
        totalOriginalPoints: totalOriginal,
        totalDownsampledPoints: totalDownsampled,
        compressionRatio: ratio,
      };
    }, [seriesData, displayData]);

  // Memoize shapes
  const TriangleShape = (props: any) => {
    const { cx, cy, fill } = props;
    return (
      <svg x={cx - 7} y={cy - 7} width={14} height={14} fill={fill}>
        <polygon points="7,0 14,14 0,14" fill={fill} />
      </svg>
    );
  };

  const CustomCircle = (props: any) => {
    const { cx, cy, fill } = props;
    return <circle cx={cx} cy={cy} r={4} fill={fill} />;
  };

  // Flatten all points into a single array
  const flatPoints = Object.entries(displayData).flatMap(([key, points]) =>
    points.map((point) => ({
      ...point,
      displayName: key.includes("Cleaning")
        ? `${key.replace("Cleaning", "")} Cleaning`
        : key,
      shape: key.includes("Cleaning") ? TriangleShape : CustomCircle,
    }))
  );

  const CustomPointShape = (props: any) => {
    const { cx, cy, payload } = props;
    // Use triangle for cleaning, circle otherwise
    if (payload.isCleaning) {
      return (
        <svg x={cx - 7} y={cy - 7} width={14} height={14}>
          <polygon points="7,0 14,14 0,14" fill={payload.color} />
        </svg>
      );
    }
    return <circle cx={cx} cy={cy} r={4} fill={payload.color} />;
  };

  return (
    <div className="p-4 m-4 bg-white rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4 ml-4">{title}</h2>

      {/* Simple Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-800">
            {metricName}
          </span>
          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
            {totalDownsampledPoints}/{totalOriginalPoints} points
          </span>
          {!showOriginal && (
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
              {compressionRatio}% compressed
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Threshold Select */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Max Points</label>
            <select
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="text-xs border rounded px-2 py-1 w-20"
              disabled={showOriginal}
            >
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
              <option value={500}>500</option>
              <option value={1000}>1000</option>
              <option value={1500}>1500</option>
            </select>
          </div>

          {/* Toggle Original */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">View</label>
            <label className="flex items-center gap-1 text-xs">
              <input
                type="checkbox"
                checked={showOriginal}
                onChange={(e) => setShowOriginal(e.target.checked)}
                className="rounded"
              />
              Original
            </label>
          </div>
        </div>
      </div>

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
              dx: -60,
              style: { textAnchor: "middle" },
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
