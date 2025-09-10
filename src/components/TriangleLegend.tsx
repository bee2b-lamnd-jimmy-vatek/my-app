import { Legend, LegendProps } from "recharts";

function TriangleLegend(props: LegendProps & { payload: any[] }) {
  const { payload } = props; // ✅ payload có sẵn trong LegendProps
  return (
    <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: 0 }}>
      {payload?.map((entry, index) => (
        <li
          key={`item-${index}`}
          style={{ marginRight: 16, display: "flex", alignItems: "center" }}
        >
          <svg width={14} height={14} style={{ marginRight: 4 }}>
            <polygon points="7,0 14,14 0,14" fill={entry.color} />
          </svg>
          <span>{entry.value}</span>
        </li>
      ))}
    </ul>
  );
}

export default TriangleLegend;
