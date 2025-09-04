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
        <div className="w-full  px-10">
            <nav
                className="flex items-center bg-[#1F2937] rounded-lg overflow-hidden px-3 py-3"
                aria-label="Tabs"
            >
                {tabs.map((tab, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveTab(tab.key)}
                        className={` p-3 text-base font-medium 
                            ${
                                activeTab === tab.key
                                    ? "text-white bg-blue-500 rounded-xl "
                                    : "hover:text-white text-gray-400  hover:border-gray-300"
                            }
                            `}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
        </div>
    );
}
