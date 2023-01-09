import List from "./components/List";
import Chart from "./components/Chart";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Anime } from "./interfaces";


function App() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    fetchAnimes();
  }, []);

  const fetchAnimes = async () => {
    const res = await fetch("https://api.jikan.moe/v4/top/anime?limit=20").then(
      (response) => response.json()
    );
    const updatedData = res?.data?.map((anime: Anime) => {
      return {
        ...anime,
        release: parseInt(dayjs(anime?.aired?.from)?.format("YYYY")),
      }; // sometimes data from api returns  year property to null, so we can guarantee there is something for the release year
    });
    const sortedData = updatedData?.sort(
      (a: any, b: any) => a?.release - b?.release
    );
    console.log(sortedData);
    setAnimes(sortedData);
  };

  
  return (
    <>
      <Container maxWidth="xl">
        <List animes={animes} />
        <Chart animes={animes} />
      </Container>
    </>
  );
}

export default App;
