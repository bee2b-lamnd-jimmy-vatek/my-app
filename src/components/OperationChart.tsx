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

export default function OperationChart() {
    const generateMockData = (
        baseValue: number,
        amplitude: number,
        noiseRange: number
    ) => {
        const data = [];
        const startDate = new Date("2024-06-01").getTime();
        const endDate = new Date("2024-06-05").getTime();
        const step = (endDate - startDate) / 500;

        for (let i = 0; i < 500; i++) {
            const timePosition = i / 500;
            const sineValue = Math.sin(timePosition * Math.PI * 8);

            data.push({
                x: startDate + step * i,
                y:
                    baseValue +
                    sineValue * amplitude +
                    (Math.random() * noiseRange - noiseRange / 2),
            });
        }
        return data;
    };

    const chartConfigs = [
        {
            data: generateMockData(40, 5, 4), // Flux data
            color: "var(--chart-violet)",
            label: "Flux (Lmh)",
            domain: [30, 50],
        },
        {
            data: generateMockData(-120, 5, 4), // Permeability data
            color: "var(--chart-yellow)",
            label: "Permeability (Lmh/bar)",
            domain: [-130, -110],
        },
        {
            data: generateMockData(-35, 5, 4), // TMP data
            color: "var(--chart-green)",
            label: "TMP (kPa)",
            domain: [-45, -25],
        },
    ];

    return (
        <div className="flex flex-col gap-4 p-4 ">
            {chartConfigs.map((config, index) => (
                <div
                    key={index}
                    style={{ width: "100%", height: 200, color: "text-body" }}
                >
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
                                tickFormatter={(unix) =>
                                    new Date(unix).toLocaleDateString()
                                }
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
            ))}
        </div>
    );
}
