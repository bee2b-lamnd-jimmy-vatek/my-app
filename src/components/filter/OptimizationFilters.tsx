import { useState } from "react";
import Select from "../selects/Select";

interface OptimizationFiltersProps {
  onRefresh?: () => void;
}

export default function OptimizationFilters({
  onRefresh,
}: OptimizationFiltersProps) {
  const membraneOptions = [
    { value: "UF_2", label: "UF_Membrane_Train_2" },
    { value: "UF_3", label: "UF_Membrane_Train_3" },
  ];

  const [selected, setSelected] = useState("");

  return (
    <div className="flex flex-wrap gap-4 items-center mb-6 ">
      <Select
        options={membraneOptions}
        placeholder="Select Membrane Train"
        value={selected}
        onChange={setSelected}
      />

      <select
        className=" rounded-lg px-3 py-1 text-sm text-text-caption bg-background-input hover:border-gray-300  focus:outline-none"
        defaultValue=""
      >
        <option value="" disabled className="text-text-caption">
          Select Trial
        </option>
        <option value="4000" className="text-text-caption">
          Trial_Demo_4000
        </option>
        <option value="5000" className="text-text-caption">
          Trial_Demo_5000
        </option>
      </select>

      <button
        className="px-3 py-2 bg-button-bg text-text-header rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={onRefresh}
      >
        Refresh
      </button>
    </div>
  );
}
