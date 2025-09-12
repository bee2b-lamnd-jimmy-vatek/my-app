// src/pages/OptimizationTrialResults.tsx
import { useState } from "react";
import OptimizationFilters from "../components/filter/OptimizationFilters";
import TrialDetails, { Details } from "../components/details/TrialDetails";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProfileChart from "../components/chart/ProfileChart";

interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function AccordionItem({
  title,
  isOpen,
  onClick,
  children,
}: AccordionItemProps) {
  return (
    <div className="bg-bg-card shadow rounded-lg p-4">
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full text-left"
      >
        <h2 className="text-lg font-semibold text-text-body">{title}</h2>
        {isOpen ? (
          <ChevronUp className="text-icon" />
        ) : (
          <ChevronDown className="text-icon" />
        )}
      </button>

      {isOpen && (
        <div className="text-sm space-y-2 text-text-body mt-4">{children}</div>
      )}
    </div>
  );
}
export default function OptimizationTrialResults() {
  const [schedule] = useState([
    { timestamp: "2023-10-10 12:00:00", dosage: 725, method: "Hypo" },
    { timestamp: "2023-10-11 12:00:00", dosage: 725, method: "Hypo" },
    { timestamp: "2023-10-13 00:00:00", dosage: 575, method: "Hypo" },
    { timestamp: "2023-10-14 00:00:00", dosage: 1400, method: "CA" },
    { timestamp: "2023-10-15 00:00:00", dosage: 650, method: "Hypo" },
    { timestamp: "2023-10-16 00:00:00", dosage: 575, method: "Hypo" },
  ]);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleRefresh = () => {
    // Add refresh logic here
  };

  return (
    <div className="min-h-screen w-full max-w-none overflow-x-hidden px-5 py-6">
      <OptimizationFilters onRefresh={handleRefresh} />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-bg-card shadow rounded-lg p-4 text-center">
          <p className="text-sm font-medium text-text-caption">
            Estimated cost for Trial
          </p>
          <p className="text-2xl font-bold text-text-body">$576.14</p>
        </div>
        <div className="bg-bg-card shadow rounded-lg p-4 text-center">
          <p className="text-sm font-medium text-text-caption">
            Estimated production volume
          </p>
          <p className="text-2xl font-bold text-text-body">82,413.00 m³</p>
        </div>
        <div className="bg-bg-card shadow rounded-lg p-4 text-center">
          <p className="text-sm font-medium text-text-caption">Avg Flux</p>
          <p className="text-2xl font-bold text-text-body">42.00 Lmh</p>
        </div>
        <div className="bg-bg-card shadow rounded-lg p-4 text-center">
          <p className="text-sm font-medium text-text-caption">
            Average Turbidity
          </p>
          <p className="text-2xl font-bold text-text-body">0.47 NTU</p>
        </div>
        <div className="bg-bg-card shadow rounded-lg p-4 text-center">
          <p className="text-sm font-medium text-text-caption">
            Estimated Permeability Loss
          </p>
          <p className="text-2xl font-bold text-text-body">0.13 Lmh/bar</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Cleaning Schedule Table */}
        <div className="bg-bg-card shadow rounded-lg p-4 lg:col-span-2">
          <h2 className="text-lg font-semibold text-text-body mb-4">
            Cleaning Schedule
          </h2>
          <table className="w-full text-sm text-left border border-transparent">
            <thead className=" text-text-body">
              <tr>
                <th className="px-3 py-2 border border-transparent">
                  TimeStamp
                </th>
                <th className="px-3 py-2">Cleaning Dosage (PPM)</th>
                <th className="px-3 py-2">Cleaning Method</th>
              </tr>
            </thead>
            <tbody className="text-text-caption">
              {schedule.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 hover:text-black">
                  <td className="px-3 py-2">{row.timestamp}</td>
                  <td className="px-3 py-2">{row.dosage}</td>
                  <td className="px-3 py-2">{row.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-2">
          <AccordionItem
            title="Profile Chart"
            isOpen={openIndex === 0}
            onClick={() => toggle(0)}
          >
            <ProfileChart />
          </AccordionItem>

          <AccordionItem
            title="Trial Details"
            isOpen={openIndex === 1}
            onClick={() => toggle(1)}
          >
            <TrialDetails />
          </AccordionItem>

          <AccordionItem
            title="Details"
            isOpen={openIndex === 2}
            onClick={() => toggle(2)}
          >
            <Details />
          </AccordionItem>
        </div>
      </div>
    </div>
  );
}
