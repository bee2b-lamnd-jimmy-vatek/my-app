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
      <div className="p-6">
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white shadow mt-4 px-6 py-4 flex flex-wrap gap-4 items-center w-full">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <input
                type="date"
                className="border rounded-lg px-2 py-1 text-sm"
                defaultValue="2024-02-01"
              />
              <span>→</span>
              <input
                type="date"
                className="border rounded-lg px-2 py-1 text-sm"
                defaultValue="2024-06-30"
              />
            </div>

            <select className="border rounded-lg px-3 py-1 text-sm">
              <option>UF_Membrane_Train_2</option>
              <option>UF_Membrane_Train_3</option>
            </select>

            <button className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Submit
            </button>
          </div>

          {/* Chart 1 */}
          <div className="bg-white shadow mt-6 p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
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
                />
                <YAxis
                  label={{
                    value: "Permeability Jump",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Bar dataKey="jump" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 2 */}
          <div className="bg-white shadow mt-6 p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Prediction Explainer
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={explainerData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="factor" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="impact" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

