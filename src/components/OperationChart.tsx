// components/OperationChart.tsx
import { memo, useEffect, useState, useMemo } from "react";
import Loading from "./Loading";
import SingleChart from "./SingleChart";

interface OperationChartProps {
  selectedTags: string[];
}

const OperationChartComponent = ({ selectedTags }: OperationChartProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [displayedTags, setDisplayedTags] = useState<string[]>(selectedTags);

  // Sử dụng useMemo để tránh tính toán lại dữ liệu mỗi lần render
  const chartConfigs = useMemo(() => {
    const generateMockData = (
      baseValue: number,
      amplitude: number,
      noiseRange: number
    ) => {
      const data = [];
      const startDate = new Date("2024-06-01").getTime();
      const endDate = new Date("2024-06-05").getTime();
      const step = (endDate - startDate) / 500;

      for (let i = 0; i < 500; i++) {
        const timePosition = i / 500;
        const sineValue = Math.sin(timePosition * Math.PI * 8);

        data.push({
          x: startDate + step * i,
          y:
            baseValue +
            sineValue * amplitude +
            (Math.random() * noiseRange - noiseRange / 2),
        });
      }
      return data;
    };

    return [
      {
        key: "flux",
        data: generateMockData(40, 5, 4),
        color: "var(--chart-violet)",
        label: "Flux (Lmh)",
        domain: [30, 50] as [number, number],
      },
      {
        key: "perm",
        data: generateMockData(-120, 5, 4),
        color: "var(--chart-yellow)",
        label: "Permeability (Lmh/bar)",
        domain: [-130, -110] as [number, number],
      },
      {
        key: "tmp",
        data: generateMockData(-35, 5, 4),
        color: "var(--chart-green)",
        label: "TMP (kPa)",
        domain: [-45, -25] as [number, number],
      },
    ];
  }, []);

  const filteredConfigs = useMemo(() => {
    return selectedTags.length > 0
      ? chartConfigs.filter((c) => displayedTags.includes(c.key))
      : [];
  }, [selectedTags, displayedTags, chartConfigs]);

  useEffect(() => {
    if (selectedTags.join(",") !== displayedTags.join(",")) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setDisplayedTags(selectedTags);
        setIsLoading(false);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [selectedTags, displayedTags]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {filteredConfigs.map((config) => (
        <SingleChart key={config.key} config={config} />
      ))}
    </div>
  );
};

export default memo(OperationChartComponent, (prevProps, nextProps) => {
  return prevProps.selectedTags.join(",") === nextProps.selectedTags.join(",");
});
