import { useState } from "react";

export default function Details() {
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
            <thead className="bg-[#374151] text-[#969DA9]">
                <tr>
                    <th className="px-3 py-2 ">Parameters</th>
                    <th className="px-3 py-2 ">Baseline Operation</th>
                    <th className="px-3 py-2 ">Optimized Operation</th>
                </tr>
            </thead>
            <tbody className="text-[#F1FFFF]">
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
}
