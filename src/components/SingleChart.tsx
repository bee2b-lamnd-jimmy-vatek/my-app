/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useState } from "react";
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
import {
  useDownsampling,
  type DownsamplingAlgorithm,
} from "../hook/useDownsampling";

interface SingleChartProps {
  config: {
    key: string;
    data: any[];
    color: string;
    label: string;
    domain: [number, number];
  };
}

const ALGORITHMS: { value: DownsamplingAlgorithm; label: string }[] = [
  { value: "lttb", label: "LTTB (Best)" },
  { value: "min-max", label: "Min-Max" },
  { value: "every-nth", label: "Every Nth" },
  { value: "average", label: "Average" },
];

const THRESHOLDS = [50, 100, 200, 500];

const SingleChart = memo(({ config }: SingleChartProps) => {
  const [algorithm, setAlgorithm] = useState<DownsamplingAlgorithm>("lttb");
  const [threshold, setThreshold] = useState(200);
  const [showOriginal, setShowOriginal] = useState(false);

  const downsampledData = useDownsampling(config.data, algorithm, threshold);
  const displayData = showOriginal ? config.data : downsampledData;

  const compressionRatio = (
    (1 - downsampledData.length / config.data.length) *
    100
  ).toFixed(1);

  return (
    <div
      style={{ width: "100%", height: 280, color: "var(--text-body)" }}
      className="mb-6"
    >
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-800">
            {config.label}
          </span>
          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
            {displayData.length}/{config.data.length} points
          </span>
          {!showOriginal && (
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
              {compressionRatio}% compressed
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Algorithm Select */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Algorithm</label>
            <select
              value={algorithm}
              onChange={(e) =>
                setAlgorithm(e.target.value as DownsamplingAlgorithm)
              }
              className="text-xs border rounded px-2 py-1 w-28"
              disabled={showOriginal}
            >
              {ALGORITHMS.map((algo) => (
                <option key={algo.value} value={algo.value}>
                  {algo.label}
                </option>
              ))}
            </select>
          </div>

          {/* Threshold Select */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Max Points</label>
            <select
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="text-xs border rounded px-2 py-1 w-20"
              disabled={showOriginal}
            >
              {THRESHOLDS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
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

      {/* Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
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
              formatter={(value) => [
                `${Number(value).toFixed(2)}`,
                config.label,
              ]}
              labelFormatter={(label) =>
                new Date(Number(label)).toLocaleDateString()
              }
            />
            <Legend />
            <Scatter
              name={
                showOriginal ? "Original Data" : `Downsampled (${algorithm})`
              }
              data={displayData}
              fill={config.color}
              r={showOriginal ? 1 : 3}
              opacity={showOriginal ? 0.6 : 1}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Info Footer */}
      {!showOriginal && (
        <div className="text-xs text-gray-500 mt-2 text-center p-2 bg-blue-50 rounded">
          <span className="font-medium">Algorithm:</span> {algorithm} •
          <span className="font-medium"> Max Points:</span> {threshold} •
          <span className="font-medium"> Compression:</span> {compressionRatio}%
          •<span className="font-medium"> Performance:</span>{" "}
          {displayData.length < 100
            ? "⚡ Fast"
            : displayData.length < 300
            ? "🚀 Medium"
            : "🐢 Slow"}
        </div>
      )}
    </div>
  );
});

SingleChart.displayName = "SingleChart";

export default SingleChart;
