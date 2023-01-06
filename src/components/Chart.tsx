import { useEffect, useState } from "react";
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from "recharts";

function Chart() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    fetchAnimes();
  }, []);

  const fetchAnimes = async () => {
    const res = await fetch("https://api.jikan.moe/v4/top/anime?limit=20").then(
      (response) => response.json()
    );
    console.log(res);
    const sortedData = res?.data.sort((a: any,b: any) => a?.year - b?.year)
    setAnimes(sortedData);
  };
  return (
    <>
      <AreaChart
        width={730}
        height={250}
        data={animes}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            {/* <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.8} /> */}
          </linearGradient>
        </defs>
        <XAxis dataKey="year" />
        <YAxis dataKey="score" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip  />
        <Area
          type="monotone"
          dataKey="score"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        
      </AreaChart>
    </>
  );
}
export default Chart;
