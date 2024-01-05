import { useEffect, useState } from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

const generateRandomData = (
  numPoints = 5,
  xRange = [1, 5],
  yRange = [1, 50000]
) => {
  return Array.from({ length: numPoints }, (_, index) => {
    return {
      x: index + xRange[0],
      y: Math.floor(Math.random() * (yRange[1] - yRange[0] + 1)) + yRange[0],
    };
  });
};

export default function Home() {
  const [data, setData] = useState(generateRandomData());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData(generateRandomData());
    }, 3000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <main className="body flex w-screen h-screen bg-white">
      <div className="debug-red flex w-full h-full">
        <VictoryChart
          // doesn't make a difference whether animate is set only here, only on victory line or on both
          animate={{ duration: 1000 }}
          theme={VictoryTheme.material}
        >
          <VictoryLine
            animate={{ duration: 1000 }}
            data={data}
            style={{
              data: { stroke: "green", width: 12 },
            }}
          />
        </VictoryChart>
      </div>
    </main>
  );
}
