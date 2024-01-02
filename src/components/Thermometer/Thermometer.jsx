import ReactSlider from "react-slider";
import "./Thermometer.css";
import { useClimate } from "../../context/ClimateContext";
import { useState, useEffect } from "react";

function Thermometer() {
  const { temperature, setTemperature } = useClimate();
  const [userTemp, setUserTemp] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (userTemp === temperature) {
        return;
      } else if (userTemp > temperature) {
        setTemperature(temperature + 1);
      } else if (userTemp < temperature) {
        setTemperature(temperature - 1);
      }
    }, [userTemp]);
    return () => {clearTimeout(timer)}
  });
  return (
    <section>
      <h2>Thermometer</h2>
      <div className="actual-temp">Actual Temperature: {temperature}°F</div>
      <ReactSlider
        value={temperature}
        onAfterChange={(val) => {
          setUserTemp(val);
        }}
        className="thermometer-slider"
        thumbClassName="thermometer-thumb"
        trackClassName="thermometer-track"
        ariaLabel={"Thermometer"}
        orientation="vertical"
        min={0}
        max={120}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        invert
        pearling
        minDistance={1}
      />
    </section>
  );
}

export default Thermometer;
