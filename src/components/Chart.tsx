import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";
import { Anime } from "../interfaces";


function Chart({animes} : Anime) {
  
  const CustomTooltip = ({ active, payload, label }: any)  => {
    if (active && payload && payload.length) {
      return (
        <div style={{ margin: "2em", textAlign: "center" }}>
          <p>{label}</p>
          {payload?.map((p: any) => (
              <p key={p?.payload?.mal_id}>{p?.payload?.title}</p>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ResponsiveContainer width="85%" aspect={3}>
          <AreaChart data={animes}>
            <defs>
              <linearGradient id="score" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <XAxis dataKey="release" allowDuplicatedCategory={false} allowDataOverflow={true}  />
            <YAxis  dataKey="score" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#score)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
export default Chart;
