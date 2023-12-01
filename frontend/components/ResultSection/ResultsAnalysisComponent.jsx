import { useState } from "react";
import Image from "next/image";

const ResultCard = ({ src, description, value, id, unit, scale }) => {
  value *= scale;

  return (
    <div className="flex items-center justify-around p-2 rounded bg-background">
      <div className="flex items-center justify-center">
        <Image src={src} alt={description} width={75} height={75} />
      </div>
      <div className="flex-col justify-start">
        <div id={id}>
          {value.toFixed(3)} {unit}
        </div>
        <div>{description}</div>
      </div>
    </div>
  );
};

const ResultsAnalysisComponent = ({ results }) => {
  const [scale, setScale] = useState(1000);
  if (results.success === false) {
    return <h1>Execute valid code first!</h1>;
  }

  const carbonFootprint = Number(results?.carbon_footprint || 0.0);
  const cpuUsage = Number(results?.cpu_usage || 0.0);
  const energyNeeded = Number(results?.energy_needed || 0.0);

  const tree_years = Number(carbonFootprint / 11000);
  const numFlights = Number(carbonFootprint / 196137000);
  const car_percent = Number(carbonFootprint / 175);
  const netflix_hour = Number(carbonFootprint / 36);
  
  const num_snack = Number(carbonFootprint / 250);
  const num_tissue = Number(carbonFootprint / 283);
  const g_beef = Number(carbonFootprint / 13.71875); //1g
  const ml_orange_juice = Number(carbonFootprint / 1.44); //ml

  return (
    <div className="flex flex-col items-start justify-center gap-3 p-2 bg-surface">
      <div className="grid items-stretch justify-center w-full grid-cols-3 gap-3 p-2 text-center rounded bg-surface-dark">
        <ResultCard
          src="/assets/icons/carbon-footprint.svg"
          description="of Carbon Emission"
          value={carbonFootprint}
          id="carbonFootprint_text"
          unit="g CO2e"
          scale={1}
        />
        <ResultCard
          src="/assets/icons/energy.svg"
          description="of Energy Needed"
          value={energyNeeded}
          id="energyNeeded_text"
          unit="kWh"
          scale={1}
        />
        <ResultCard
          src="/assets/icons/co2_icon.svg"
          description="Cpu Usage"
          value={cpuUsage}
          id="cpuUsage_text"
          unit=""
          scale={1}
        />
      </div>

      <h2>
        Executing this code for
        <span className="inline-flex items-center justify-center h-full mt-8">
          <input
            type="number"
            value={scale}
            onChange={(e) => {
              setScale(e.target.value);
            }}
            className="w-32 h-full p-2 mx-2 text-left border border-blue-500"
          />
        </span>
        times is equivalent to:
      </h2>

      <div className="grid items-center justify-center w-full grid-cols-2 gap-3 p-2 text-center rounded bg-surface-dark">
        <ResultCard
          src="/assets/icons/tree_icon.svg"
          description=""
          value={tree_years}
          id="tree_years_text"
          unit="tree-years"
          scale={scale}
        />
        <ResultCard
          src="/assets/icons/car_icon.svg"
          description="in a passenger car"
          value={car_percent}
          id="carbonFootprint_text"
          unit="km"
          scale={scale}
        />
        <ResultCard
          src="/assets/icons/airplane_icon.svg"
          description="from Seoul to Tokyo"
          value={numFlights}
          id="flightSeoulTokyo_text"
          unit="flights"
          scale={scale}
        />
        <ResultCard
          src="/assets/icons/people_icon.svg"
          description="of streaming Netflix"
          value={netflix_hour}
          id="people_text"
          unit="hours"
          scale={scale}
        />

        <ResultCard
          src="/assets/icons/snack.svg"
          description="Snack (169g)"
          value={num_snack}
          id="num_snack_text"
          unit=""
          scale={scale}
        />
        <ResultCard
          src="/assets/icons/tissue.svg"
          description="Roll of toilet paper"
          value={num_tissue}
          id="num_tissue_text"
          unit=""
          scale={scale}
        />
        <ResultCard
          src="/assets/icons/beef.svg"
          description="of Beef"
          value={g_beef}
          id="g_beef_text"
          unit="g"
          scale={scale}
        />
        <ResultCard
          src="/assets/icons/juice.svg"
          description="of Orange Juice"
          value={ml_orange_juice}
          id="ml_orange_juice_text"
          unit="ml"
          scale={scale}
        />
      </div>
    </div>
  );
};

export default ResultsAnalysisComponent;
