function MembraneChartLegend() {
  const legendItems = [
    { label: "Actual Permeability", color: "#e53e3e", isCleaning: false },
    { label: "Predicted Permeability", color: "#3182ce", isCleaning: false },
    { label: "Optimized Permeability", color: "#38a169", isCleaning: false },
    { label: "Predicted Cleaning Events", color: "#90cdf4", isCleaning: true },
    { label: "Optimized Cleaning Events", color: "#68d391", isCleaning: true },
  ];

  return (
    <ul className="flex items-center justify-center">
      {legendItems.map((item, index) => (
        <li
          key={`legend-item-${index}`}
          style={{ marginRight: 16, display: "flex", alignItems: "center" }}
        >
          <svg width={14} height={14} style={{ marginRight: 4 }}>
            {item.isCleaning ? (
              <polygon points="0,0 14,0 7,14" fill={item.color} />
            ) : (
              <circle cx={7} cy={7} r={6} fill={item.color} />
            )}
          </svg>
          <span className="text-text-body">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

export default MembraneChartLegend;
