interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  const tabs = [
    { key: "operation", label: "Operation Data Trends" },
    { key: "membrane", label: "Membrane Performance Prediction" },
    { key: "mcjump", label: "MC Jump Prediction" },
    { key: "optimization", label: "Optimization Trial Results" },
  ];

  return (
    <div className="w-full border-t border-1 border-r border-gray-200 rounded-t-lg bg-gray-50">
      <nav className="flex" aria-label="Tabs">
        {tabs.map((tab, idx) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              flex-1 px-4 py-3 text-sm font-medium border-b-2
              transition-all duration-200 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500
              ${
                activeTab === tab.key
                  ? "text-blue-600 bg-white border-2 border-b-0 border-t-1 rounded-t-xl"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
              ${idx === 0 ? "rounded-tl-lg" : ""}
              ${idx === tabs.length - 1 ? "rounded-tr-lg" : ""}
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
