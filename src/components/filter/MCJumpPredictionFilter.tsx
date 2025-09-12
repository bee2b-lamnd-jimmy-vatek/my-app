import { useState } from "react";
import Calendar from "../selects/Calendar";
import Select from "../selects/Select";

const MCJumpPredictionFilter = () => {
  const [selected, setSelected] = useState("");

  const membraneOptions = [
    { value: "UF_2", label: "UF_Membrane_Train_2" },
    { value: "UF_3", label: "UF_Membrane_Train_3" },
  ];

  return (
    <div className="  mt-4 px-6 py-4 flex flex-wrap gap-4 items-center w-full">
      <Calendar />

      <Select
        options={membraneOptions}
        placeholder="Select Membrane Train"
        value={selected}
        onChange={setSelected}
      />

      <button className="ml-auto px-4 py-2 bg-button-bg text-text-header rounded-lg hover:bg-blue-700">
        Submit
      </button>
    </div>
  );
};

export default MCJumpPredictionFilter;
