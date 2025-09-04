import { useState } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";

import OperationTrends from "./pages/OperationTrends";
import MembranePrediction from "./pages/MembranePrediction";
import MCJumpPrediction from "./pages/MCJumpPrediction";
import OptimizationResults from "./pages/OptimizationResults";

function App() {
  const [activeTab, setActiveTab] = useState("operation");

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-full mx-auto">
        {/* Tabs */}
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Page Content */}
        <div className="mt-4 bg-white sm:px-6 rounded-lg shadow-sm">
          {activeTab === "operation" && <OperationTrends />}
          {activeTab === "membrane" && <MembranePrediction />}
          {activeTab === "mcjump" && <MCJumpPrediction />}
          {activeTab === "optimization" && <OptimizationResults />}
        </div>
      </main>

      {/* Footer Space */}
      <div className="h-16" />
    </div>
  );
}

export default App;
