interface OptimizationFiltersProps {
    onRefresh?: () => void;
}

export default function OptimizationFilters({
    onRefresh,
}: OptimizationFiltersProps) {
    return (
        <div className="flex flex-wrap gap-4 items-center mb-6 ">
            <select
                className=" rounded-lg px-3 py-1 text-sm text-white bg-[#374151] hover:border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                defaultValue=""
            >
                <option value="" disabled className="text-white">
                    Select Membrane Train
                </option>
                <option value="UF_2" className="text-white">
                    UF_Membrane_Train_2
                </option>
                <option value="UF_3" className="text-white">
                    UF_Membrane_Train_3
                </option>
            </select>

            <select
                className=" rounded-lg px-3 py-1 text-sm text-white bg-[#374151] hover:border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                defaultValue=""
            >
                <option value="" disabled className="text-white">
                    Select Trial
                </option>
                <option value="4000" className="text-white">
                    Trial_Demo_4000
                </option>
                <option value="5000" className="text-white">
                    Trial_Demo_5000
                </option>
            </select>

            <button
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={onRefresh}
            >
                Refresh
            </button>
        </div>
    );
}
