import MembraneChart from "./MembraneChart";
const permeabilityData = [
    { date: "Jun 10", actual: 130, predicted: 135, optimized: 128 },
    { date: "Jun 15", actual: 125, predicted: 132, optimized: 122 },
    { date: "Jun 20", actual: 120, predicted: 129, optimized: 118 },
    { date: "Jun 25", actual: 118, predicted: 127, optimized: 115 },
    { date: "Jun 30", actual: 115, predicted: 124, optimized: 112 },
];

const tmpData = [
    { date: "Jun 10", actual: 35, predicted: 30, optimized: 32 },
    { date: "Jun 15", actual: 34, predicted: 29, optimized: 31 },
    { date: "Jun 20", actual: 33, predicted: 28, optimized: 30 },
    { date: "Jun 25", actual: 36, predicted: 29, optimized: 32 },
    { date: "Jun 30", actual: 38, predicted: 31, optimized: 33 },
];
export default function ProfileChart() {
    return (
        <div>
            <MembraneChart
                data={permeabilityData}
                title="Permeability vs Predicted Permeability"
                metricName="Permeability"
            />
            <MembraneChart
                data={tmpData}
                title="TMP vs Predicted TMP"
                metricName="TMP"
            />
        </div>
    );
}
