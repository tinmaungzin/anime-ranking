import { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Card,
  CardMedia,
  CardContent,
  Collapse,
} from "@mui/material";
import dayjs from "dayjs";

function List() {
  const [animes, setAnimes] = useState([]);
  const [isHolding, setIsHolding] = useState(false);

  const [currentAnimeId, setCurrentAnimeId] = useState("");

  useEffect(() => {
    fetchAnimes();
  }, []);

  const fetchAnimes = async () => {
    const res = await fetch("https://api.jikan.moe/v4/top/anime?limit=20").then(
      (response) => response.json()
    );
    console.log(res);
    setAnimes(res?.data);
  };

  const cutString = (string: string, count: number) => {
    return string.length > count ? string.substr(0, count) + "..." : string;
  };
  const clicked = (current: string) => {
    console.log(current);
    setIsHolding(true);
    setCurrentAnimeId(current);
  };
  const released = () => {
    setIsHolding(false);
    setCurrentAnimeId("");
  };
  return (
    <>
      {/* {animes?.length ? animes?.map((anime: any) => <li key={anime?.url}>{anime?.title}</li>) : null} */}

      <Container maxWidth="xl">
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ paddingBlock: "2em" }}
        >
          {animes?.length
            ? animes?.map((anime: any, index) => (
                <div
                  key={anime?.url}
                  style={{
                    width: currentAnimeId === anime?.mal_id ? "300px" : "200px",
                    // height:
                    //   currentAnimeId === anime?.mal_id ? "420px" : "300px",
                    marginInline:
                      currentAnimeId === anime?.mal_id ? "0.4em" : "3.5em",
                    marginBlock: "2em",
                    // width: "200px",
                    height: "300px",
                    // margin: "3.5em",
                    borderRadius: "10px",
                    padding: "0",
                    zIndex: currentAnimeId === anime?.mal_id ? "100" : "0",
                  }}
                  onMouseDown={() => clicked(anime?.mal_id)}
                  onMouseUp={() => released()}
                  onMouseLeave={() => released()}
                  onTouchStart={() => clicked(anime?.mal_id)}
                  onTouchEnd={() => released()}
                  onTouchCancel={() => released()}
                >
                  <Card sx={{ borderRadius: "10px" }}>
                    {/* <div style={{ position: "absolute" }}>
                      <p
                        style={{
                          textAlign: "center",
                          width: "30px",
                          height: "30px",
                          background: "red",
                        }}
                      >
                        {index + 1}
                      </p>
                    </div> */}
                    <CardMedia
                      sx={{ height: 250 }}
                      image={anime?.images?.jpg?.image_url}
                      title="green iguana"
                    />
                    <CardContent style={{ height: "50px", marginTop: "0" }}>
                      <p
                        style={{
                          textAlign: "center",
                          fontSize: "0.9em",
                        }}
                      >
                        {isHolding && currentAnimeId === anime?.mal_id
                          ? anime?.title
                          : cutString(anime?.title, 30)}
                      </p>
                    </CardContent>
                    <Collapse
                      in={
                        isHolding && currentAnimeId === anime?.mal_id
                          ? true
                          : false
                      }
                      timeout="auto"
                      unmountOnExit
                      style={{ maxHeight: "120px", marginTop: "0" }}
                    >
                      <CardContent>
                        <div style={{ fontSize: "0.9em" }}>
                          <p>
                            Release :{" "}
                            {dayjs(anime?.aired?.from)?.format(
                              "ddd MMM DD YYYY"
                            )}
                          </p>
                          <p>
                            Latest :{" "}
                            {anime?.airing || !anime?.aired?.to
                              ? "now"
                              : dayjs(anime?.aired?.to)?.format(
                                  "ddd MMM DD YYYY"
                                )}
                          </p>
                          <p>Rating : {anime?.rating}</p>
                        </div>
                      </CardContent>
                    </Collapse>
                  </Card>
                </div>
              ))
            : null}
        </Grid>
      </Container>
    </>
  );
}
export default List;
