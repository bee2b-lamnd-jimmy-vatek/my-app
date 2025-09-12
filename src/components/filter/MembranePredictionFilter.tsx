import { useState } from "react";
import Calendar from "../selects/Calendar";
import Select from "../selects/Select";

const MembranePredictionFilter = () => {
  const [selected, setSelected] = useState("");

  const membraneOptions = [
    { value: "UF_2", label: "UF_Membrane_Train_2" },
    { value: "UF_3", label: "UF_Membrane_Train_3" },
  ];
  return (
    <div className="px-6 py-4 flex flex-wrap gap-4 items-center justify-start">
      <Calendar />
      <Select
        options={membraneOptions}
        placeholder="Select Membrane Train"
        value={selected}
        onChange={setSelected}
      />
      <button className="ml-auto font-medium px-4 py-2 bg-button-bg text-text-header rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none">
        Submit
      </button>
    </div>
  );
};

export default MembranePredictionFilter;
