import OperationTrendFilters from "../components/OperationTrendFilters";
import OperationChart from "../components/OperationChart";

export default function OperationTrends() {
    return (
        <div className="p-6">
            <div className="flex flex-col bg-[#1F2937] rounded-lg">
                <OperationTrendFilters />
                <OperationChart />
            </div>
        </div>
    );
}
