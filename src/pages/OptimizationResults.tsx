// src/pages/OptimizationTrialResults.tsx
import { useState } from "react";
import OptimizationFilters from "../components/OptimizationFilters";

export default function OptimizationTrialResults() {
  const [schedule] = useState([
    { timestamp: "2023-10-10 12:00:00", dosage: 725, method: "Hypo" },
    { timestamp: "2023-10-11 12:00:00", dosage: 725, method: "Hypo" },
    { timestamp: "2023-10-13 00:00:00", dosage: 575, method: "Hypo" },
    { timestamp: "2023-10-14 00:00:00", dosage: 1400, method: "CA" },
    { timestamp: "2023-10-15 00:00:00", dosage: 650, method: "Hypo" },
    { timestamp: "2023-10-16 00:00:00", dosage: 575, method: "Hypo" },
  ]);

  const handleRefresh = () => {
    // Add refresh logic here
  };

  return (
    <div className="min-h-screen w-full max-w-none overflow-x-hidden px-4 py-6">
      <OptimizationFilters onRefresh={handleRefresh} />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Estimated cost for Trial</p>
          <p className="text-2xl font-bold text-gray-800">$576.14</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Estimated production volume</p>
          <p className="text-2xl font-bold text-gray-800">82,413.00 m³</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Avg Flux</p>
          <p className="text-2xl font-bold text-gray-800">42.00 Lmh</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Average Turbidity</p>
          <p className="text-2xl font-bold text-gray-800">0.47 NTU</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Estimated Permeability Loss</p>
          <p className="text-2xl font-bold text-gray-800">0.13 Lmh/bar</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cleaning Schedule Table */}
        <div className="bg-white shadow rounded-lg p-4 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Cleaning Schedule
          </h2>
          <table className="w-full text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 border">TimeStamp</th>
                <th className="px-3 py-2 border">Cleaning Dosage (PPM)</th>
                <th className="px-3 py-2 border">Cleaning Method</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border">{row.timestamp}</td>
                  <td className="px-3 py-2 border">{row.dosage}</td>
                  <td className="px-3 py-2 border">{row.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Trial Details Panel */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Trial Details</h2>
          <div className="text-sm space-y-2">
            <div>
              <p className="font-medium text-gray-700">Membrane Profile</p>
              <p>Max Permeability drop: 50.0 Lmh</p>
              <p>Min CA MC: 1</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Trial Constants</p>
              <p>Average Flux: 42.0 Lmh</p>
              <p>Average Temperature: 25 °C</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Cleaning Profile</p>
              <p>MC Intervals: ['2', '3']</p>
              <p>Chemical Dosage: ['500','575','650','725','1400']</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Optimization Info</p>
              <p>Start Date: 10/10/2023</p>
              <p>Time Horizon: 12 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
