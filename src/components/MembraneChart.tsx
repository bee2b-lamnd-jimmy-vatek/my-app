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

export default function MembraneChart({
    data,
    title,
    metricName,
}: MembraneChartProps) {
    return (
        <div className="p-6 w-full">
            <h2 className="text-center text-lg font-semibold text-white mb-4">
                {title}
            </h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        tick={{ fill: "var(--text-body)" }}
                        tickLine={{ stroke: "#6B7280" }}
                    />
                    <YAxis
                        tick={{ fill: "var(--text-body)" }}
                        tickLine={{ stroke: "#6B7280" }}
                    />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="var(--chart-violet)"
                        strokeWidth={2}
                        name={`Actual ${metricName}`}
                    />
                    <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="var(--chart-pink)"
                        strokeWidth={2}
                        name={`Predicted ${metricName}`}
                    />
                    <Line
                        type="monotone"
                        dataKey="optimized"
                        stroke="var(--chart-green)"
                        strokeWidth={2}
                        name={`Optimized ${metricName}`}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
