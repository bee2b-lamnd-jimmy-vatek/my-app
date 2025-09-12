import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Calendar from "../selects/Calendar";
import Select from "../selects/Select";

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
  const membraneOptions = [
    { value: "UF_2", label: "UF_Membrane_Train_2" },
    { value: "UF_3", label: "UF_Membrane_Train_3" },
  ];

  const [selected, setSelected] = useState("");
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
      <Calendar />

      <Select
        options={membraneOptions}
        placeholder="Select Membrane Train"
        value={selected}
        onChange={setSelected}
      />

      <div className="relative w-60">
        <div
          className="flex flex-wrap gap-1 border rounded-lg px-2 py-1 bg-background-input cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 px-2 py-1 bg-select-bg text-select-text rounded-lg text-xs font-medium"
            >
              <span
                className="w-3 h-3 text-select-text cursor-pointer flex items-center mb-[2px]"
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
