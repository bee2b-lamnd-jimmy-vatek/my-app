export default function TrialDetails() {
    return (
        <div className="text-sm space-y-2 text-text-caption">
            <div>
                <p className="font-medium text-text-body">Membrane Profile</p>
                <p>Max Permeability drop: 50.0 Lmh</p>
                <p>Min CA MC: 1</p>
            </div>
            <div>
                <p className="font-medium text-text-body">Trial Constants</p>
                <p>Average Flux: 42.0 Lmh</p>
                <p>Average Temperature: 25 °C</p>
            </div>
            <div>
                <p className="font-medium text-text-body">Cleaning Profile</p>
                <p>MC Intervals: ['2', '3']</p>
                <p>Chemical Dosage: ['500','575','650','725','1400']</p>
            </div>
            <div>
                <p className="font-medium text-text-body">Optimization Info</p>
                <p>Start Date: 10/10/2023</p>
                <p>Time Horizon: 12 days</p>
            </div>
        </div>
    );
}
