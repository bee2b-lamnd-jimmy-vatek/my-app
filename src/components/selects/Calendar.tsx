import { Calendar as CalendarIcon } from "lucide-react";

const Calendar = () => {
  return (
    <div className="flex items-center gap-2">
      <CalendarIcon className="w-5 h-5 text-icon" />
      <input
        type="date"
        className="border rounded-lg px-2 py-1 text-sm text-text-caption bg-background-input hover:border-gray-300 focus:outline-none"
        defaultValue="2024-06-01"
      />
      <span className="text-text-caption">→</span>
      <input
        type="date"
        className="border rounded-lg px-2 py-1 text-sm text-text-caption bg-background-input hover:border-gray-300 focus:outline-none"
        defaultValue="2025-06-01"
      />
    </div>
  );
};

export default Calendar;
