import { useState } from "react";

export default function TrialDetails() {
  return (
    <div className="text-sm space-y-2 text-text-caption">
      <div>
        <p className="font-medium text-text-body">Membrane Profile</p>
        <p>Max Permeability drop: 50.0 Lmh</p>
        <p>Min CA MC: 1</p>
      </div>
      <div>
        <p className="font-medium text-text-body">Trial Constants</p>
        <p>Average Flux: 42.0 Lmh</p>
        <p>Average Temperature: 25 °C</p>
      </div>
      <div>
        <p className="font-medium text-text-body">Cleaning Profile</p>
        <p>MC Intervals: ['2', '3']</p>
        <p>Chemical Dosage: ['500','575','650','725','1400']</p>
      </div>
      <div>
        <p className="font-medium text-text-body">Optimization Info</p>
        <p>Start Date: 10/10/2023</p>
        <p>Time Horizon: 12 days</p>
      </div>
    </div>
  );
}

export const Details = () => {
  const [schedule] = useState([
    {
      parameters: "Start Time",
      baseline: "2022-08-12 10:14:00",
      optimized: "2023-10-10 12:00:00",
    },
    {
      parameters: "End Time",
      baseline: "2022-08-21 12:24:00",
      optimized: "2023-10-20 01:00:00",
    },
    {
      parameters: "Net water production",
      baseline: "48,000.00 m³",
      optimized: "82,413.00 m³",
    },
    {
      parameters: "Total Cost",
      baseline: "604.89 $",
      optimized: "576.14 $",
    },
  ]);
  return (
    <table className="w-full text-sm text-left border border-transparent">
      <thead className=" text-text-body">
        <tr>
          <th className="px-3 py-2 ">Parameters</th>
          <th className="px-3 py-2 ">Baseline Operation</th>
          <th className="px-3 py-2 ">Optimized Operation</th>
        </tr>
      </thead>
      <tbody className="text-text-caption">
        {schedule.map((row, idx) => (
          <tr key={idx} className="hover:bg-gray-50 hover:text-black">
            <td className="px-3 py-2 ">{row.parameters}</td>
            <td className="px-3 py-2 ">{row.baseline}</td>
            <td className="px-3 py-2 ">{row.optimized}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
