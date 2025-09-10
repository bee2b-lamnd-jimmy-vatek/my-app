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

type DataPoint = {
  date: string;
  actual: number;
  predicted: number;
  optimized: number;
  predictedCleaning?: number;
  optimizedCleaning?: number;
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

export default function MembraneChart({
  data,
  title,
  metricName,
  domain,
}: MembraneChartProps) {
  const TriangleShape = (props: any) => {
    const { cx, cy, fill } = props;

    return (
      <svg x={cx - 7} y={cy - 7} width={14} height={14} fill={fill}>
        <polygon points="0,0 14,0 7,14" fill={fill} />
      </svg>
    );
  };

  const CustomCircle = ({ cx, cy, fill }: any) => (
    <circle cx={cx} cy={cy} r={8} fill={fill} stroke="black" />
  );

  const actualData = data.map((d) => ({
    x: new Date(d.date).getTime(),
    y: d.actual,
  }));
  const predictedData = data.map((d) => ({
    x: new Date(d.date).getTime(),
    y: d.predicted,
  }));
  const optimizedData = data.map((d) => ({
    x: new Date(d.date).getTime(),
    y: d.optimized,
  }));
  const predictedCleaningData = data
    .filter((d) => d.predictedCleaning !== undefined)
    .map((d) => ({
      x: new Date(d.date).getTime(),
      y: d.predictedCleaning!,
    }));
  const optimizedCleaningData = data
    .filter((d) => d.optimizedCleaning !== undefined)
    .map((d) => ({
      x: new Date(d.date).getTime(),
      y: d.optimizedCleaning!,
    }));

  return (
    <div className="p-4 m-4 bg-white rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={350}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            type="number"
            domain={["dataMin", "dataMax"]}
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
            }}
          />
          <Tooltip
            formatter={(value) => [`${value}`, metricName]}
            labelFormatter={(label) =>
              new Date(label).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })
            }
          />
          <Legend content={<TriangleLegend />} />

          {/* Permeability series */}
          <Scatter
            name={`Actual ${metricName}`}
            data={actualData}
            fill="red"
            shape="circle"
          />
          <Scatter
            name={`Predicted ${metricName}`}
            data={predictedData}
            fill="blue"
            shape="circle"
          />
          <Scatter
            name={`Optimized ${metricName}`}
            data={optimizedData}
            fill="green"
            shape="circle"
          />

          {/* Cleaning events series */}
          <Scatter
            name="Predicted cleaning events"
            data={predictedCleaningData}
            fill="skyblue"
            shape={<TriangleShape fill="skyblue" />}
          />
          <Scatter
            name="Optimized cleaning events"
            data={optimizedCleaningData}
            fill="limegreen"
            shape={<TriangleShape fill="limegreen" />}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
