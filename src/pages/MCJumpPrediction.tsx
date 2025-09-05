// src/pages/MCJumpPrediction.tsx
import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Calendar } from "lucide-react";

export default function MCJumpPrediction() {
    const [data] = useState([
        { date: "Feb 1", jump: 15 },
        { date: "Feb 10", jump: 21 },
        { date: "Feb 20", jump: 12 },
        { date: "Mar 5", jump: 8 },
        { date: "Mar 15", jump: 18 },
        { date: "Mar 25", jump: 5 },
        { date: "Apr 2", jump: 14 },
        { date: "Apr 15", jump: 10 },
        { date: "May 1", jump: 16 },
    ]);

    const [explainerData] = useState([
        { factor: "1", impact: 2.5 },
        { factor: "2", impact: -1.2 },
        { factor: "3", impact: 3.1 },
        { factor: "4", impact: 0.8 },
        { factor: "5", impact: -0.5 },
    ]);

    return (
        <div className="min-h-screen w-full max-w-none overflow-x-hidden px-4">
            <div className="p-2">
                <div className="space-y-5">
                    {/* Filters */}
                    <div className="  mt-4 px-6 py-4 flex flex-wrap gap-4 items-center w-full">
                        <div className="flex items-center gap-2 text-text-caption ">
                            <Calendar className="w-5 h-5 text-icon" />
                            <input
                                type="date"
                                className="border rounded-lg px-2 py-1 text-sm bg-background-input hover:border-gray-300"
                                defaultValue="2024-02-01"
                            />
                            <span>→</span>
                            <input
                                type="date"
                                className="border rounded-lg px-2 py-1 text-sm bg-background-input hover:border-gray-300"
                                defaultValue="2024-06-30"
                            />
                        </div>

                        <select className="border rounded-lg px-3 py-1 text-sm text-text-caption bg-background-input hover:border-gray-300  focus:outline-none">
                            <option
                                value=""
                                disabled
                                className="text-text-caption"
                            >
                                Select Membrane Train
                            </option>
                            <option value="UF_2" className="text-text-caption">
                                UF_Membrane_Train_2
                            </option>
                            <option value="UF_3" className="text-text-caption">
                                UF_Membrane_Train_3
                            </option>
                        </select>

                        <button className="ml-auto px-4 py-2 bg-button-bg text-text-header rounded-lg hover:bg-blue-700">
                            Submit
                        </button>
                    </div>

                    {/* Chart 1 */}
                    <div className="bg-bg-card shadow mt-6 p-4 ">
                        <h2 className="text-lg font-semibold text-text-body mb-4">
                            Increase in permeability after cleaning
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="date"
                                    label={{
                                        value: "Start Time",
                                        position: "insideBottom",
                                        offset: -5,
                                    }}
                                    tick={{
                                        fill: "var(--text-body)",
                                        fontSize: 12,
                                    }}
                                />
                                <YAxis
                                    label={{
                                        value: "Permeability Jump",
                                        angle: -90,
                                        position: "insideLeft",
                                    }}
                                    tick={{
                                        fill: "var(--text-body)",
                                        fontSize: 12,
                                    }}
                                />
                                <Tooltip />
                                <Bar dataKey="jump" fill="var(--chart-cyan)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Chart 2 */}
                    <div className="bg-bg-card shadow mt-6 p-4">
                        <h2 className="text-lg font-semibold text-text-body mb-4">
                            Prediction Explainer
                        </h2>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={explainerData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="factor"
                                    tick={{
                                        fill: "var(--text-body)",
                                        fontSize: 12,
                                    }}
                                />
                                <YAxis
                                    tick={{
                                        fill: "var(--text-body)",
                                        fontSize: 12,
                                    }}
                                />
                                <Tooltip />
                                <Bar
                                    dataKey="impact"
                                    fill="var(--chart-purple)"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
