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
        <div className="w-full">
            <nav
                className="flex items-center border-b border-divider-primary px-10"
                aria-label="Tabs"
            >
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`
                            relative px-4 py-3 text-base font-medium
                            ${
                                activeTab === tab.key
                                    ? "text-text-body"
                                    : "text-text-caption hover:text-text-body"
                            }
                        `}
                    >
                        {tab.label}
                        {activeTab === tab.key && (
                            <span className="absolute left-1/2 -bottom-0 h-[2px] w-32 -translate-x-1/2 bg-button-bg rounded" />
                        )}
                    </button>
                ))}
            </nav>
        </div>
    );
}
