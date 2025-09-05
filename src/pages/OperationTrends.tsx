import OperationTrendFilters from "../components/OperationTrendFilters";
import OperationChart from "../components/OperationChart";

export default function OperationTrends() {
    return (
        <div className="p-6">
            <div className="flex flex-col bg-bg-card ">
                <OperationTrendFilters />
                <OperationChart />
            </div>
        </div>
    );
}
