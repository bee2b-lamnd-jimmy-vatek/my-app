import { lazy, useState } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import Loading from "./components/Loading";

// import OperationTrends from "./pages/OperationTrends";
// import MembranePrediction from "./pages/MembranePrediction";
// import MCJumpPrediction from "./pages/MCJumpPrediction";
// import OptimizationResults from "./pages/OptimizationResults";

const OperationTrends = lazy(() => import("./pages/OperationTrends"));
const MembranePrediction = lazy(() => import("./pages/MembranePrediction"));
const MCJumpPrediction = lazy(() => import("./pages/MCJumpPrediction"));
const OptimizationResults = lazy(() => import("./pages/OptimizationResults"));

function App() {
  const [activeTab, setActiveTab] = useState("operation");
  const [loading, setLoading] = useState(false);

  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-full">
        {/* Tabs */}
        <Tabs activeTab={activeTab} setActiveTab={handleTabChange} />

        {/* Page Content */}
        <div className="sm:px-4">
          {loading ? (
            <Loading />
          ) : (
            <>
              {activeTab === "operation" && <OperationTrends />}
              {activeTab === "membrane" && <MembranePrediction />}
              {activeTab === "mcjump" && <MCJumpPrediction />}
              {activeTab === "optimization" && <OptimizationResults />}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
