import { Calendar, ChevronDown } from "lucide-react";
import { useState } from "react";

interface OperationTrendFiltersProps {
  onSubmit?: () => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}

export default function OperationTrendFilters({
  selectedTags,
  setSelectedTags,
  onSubmit,
}: OperationTrendFiltersProps) {
  const allTags = ["flux", "perm", "tmp"];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

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

      <div className="relative w-60">
        <div
          className="flex flex-wrap gap-1 border rounded-lg px-2 py-1 bg-background-input cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium"
            >
              <span
                className="w-3 h-3 text-text-body cursor-pointer flex items-center mb-[2px]"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTag(tag);
                }}
              >
                x
              </span>
              {tag}
            </span>
          ))}
          <span className="ml-auto text-text-caption text-xs flex items-center">
            <ChevronDown className="w-4 h-4" />
          </span>
        </div>

        {isDropdownOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-40 overflow-auto">
            {allTags
              .filter((tag) => !selectedTags.includes(tag))
              .map((tag) => (
                <div
                  key={tag}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-text-caption"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </div>
              ))}
            {allTags.filter((tag) => !selectedTags.includes(tag)).length ===
              0 && (
              <div className="px-3 py-2 text-gray-400 text-sm">
                No more tags
              </div>
            )}
          </div>
        )}
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
