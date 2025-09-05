import { Calendar } from "lucide-react";

interface OperationTrendFiltersProps {
    onSubmit?: () => void;
}

export default function OperationTrendFilters({
    onSubmit,
}: OperationTrendFiltersProps) {
    const tags = ["flux", "perm", "tmp"];

    return (
        <div className=" px-6 py-4 flex flex-wrap gap-4 items-center w-full">
            <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-icon" />
                <input
                    type="date"
                    className="border rounded-lg px-2 py-1 text-sm text-text-caption bg-background-input hover:border-gray-300  focus:outline-none"
                    defaultValue="2024-06-01"
                />
                <span className="text-text-caption">→</span>
                <input
                    type="date"
                    className="border rounded-lg px-2 py-1 text-sm text-text-caption bg-background-input hover:border-gray-300  focus:outline-none"
                    defaultValue="2024-06-30"
                />
            </div>

            <select className="border rounded-lg px-3 py-1 text-sm text-text-caption bg-background-input hover:border-gray-300  focus:outline-none">
                <option value="UF_2" className="text-text-caption">
                    UF_Membrane_Train_2
                </option>
                <option value="UF_3" className="text-text-caption">
                    UF_Membrane_Train_3
                </option>
            </select>

            <div className="flex gap-2">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <button
                className="ml-auto font-medium px-4 py-2 bg-button-bg text-text-header rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none  "
                onClick={onSubmit}
            >
                Submit
            </button>
        </div>
    );
}
