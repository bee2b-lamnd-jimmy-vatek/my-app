interface OptimizationFiltersProps {
    onRefresh?: () => void;
}

export default function OptimizationFilters({
    onRefresh,
}: OptimizationFiltersProps) {
    return (
        <div className="flex flex-wrap gap-4 items-center mb-6 ">
            <select
                className=" rounded-lg px-3 py-1 text-sm text-text-caption bg-background-input hover:border-gray-300  focus:outline-none"
                defaultValue=""
            >
                <option value="" disabled className="text-text-caption">
                    Select Membrane Train
                </option>
                <option value="UF_2" className="text-text-caption">
                    UF_Membrane_Train_2
                </option>
                <option value="UF_3" className="text-text-caption">
                    UF_Membrane_Train_3
                </option>
            </select>

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
