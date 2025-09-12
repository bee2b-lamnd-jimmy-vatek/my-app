import OperationTrendFilters from "../components/filter/OperationTrendFilters";
import OperationChart from "../components/chart/OperationChart";
import { useState } from "react";

export default function OperationTrends() {
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "flux",
    "perm",
    "tmp",
  ]);

  return (
    <div className="p-6">
      <div className="flex flex-col bg-bg-card ">
        <OperationTrendFilters
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        <OperationChart selectedTags={selectedTags} />
      </div>
    </div>
  );
}
