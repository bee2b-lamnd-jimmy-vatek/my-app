import { useState } from "react";
import OperationTrendFilters from "../components/OperationTrendFilters";
import OperationChart from "../components/OperationChart";

export default function OperationTrends() {
  return (
    <div className="p-6">
      <div className="space-y-6">
        <OperationTrendFilters />
        <OperationChart />
      </div>
    </div>
  );
}
