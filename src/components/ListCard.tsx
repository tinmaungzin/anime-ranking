import { useState } from "react";
import { Card, CardMedia, CardContent, Collapse } from "@mui/material";
import dayjs from "dayjs";
import { Anime } from "../interfaces";


function ListCard({ anime, index }: Anime) {
  const [isHolding, setIsHolding] = useState(false);
  const [currentAnimeId, setCurrentAnimeId] = useState(-1);

  const cutString = (string: string, count: number) => {
    return string.length > count ? string.substr(0, count) + "..." : string;
  };
  const clicked = (current: number) => {
    setIsHolding(true);
    setCurrentAnimeId(current);
  };
  const released = () => {
    setIsHolding(false);
    setCurrentAnimeId(-1);
  };
  return (
    <>
      <div
        key={anime?.url}
        style={{
          width: currentAnimeId === anime?.mal_id ? "300px" : "200px",
          marginInline: currentAnimeId === anime?.mal_id ? "0.4em" : "3.5em",
          marginBlock: "2em",
          height: "300px",
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
          <div style={{display: "flex", justifyContent: "end"}}>
          <div style={{ position: "absolute"}}>
            <p
              style={{
                textAlign: "center",
                width: "30px",
                height: "30px",
                background: "pink",
                margin: "0",
                borderTopRightRadius: "10px",
                paddingTop: "0.7em"
              }}
            >
              {index + 1}
            </p>
          </div>
          </div>
          
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
            in={isHolding && currentAnimeId === anime?.mal_id ? true : false}
            timeout="auto"
            unmountOnExit
            style={{ maxHeight: "120px", marginTop: "0" }}
          >
            <CardContent>
              <div style={{ fontSize: "0.9em" }}>
                <p>
                  Release :{" "}
                  {dayjs(anime?.aired?.from)?.format("ddd MMM DD YYYY")}
                </p>
                <p>
                  Latest :{" "}
                  {anime?.airing || !anime?.aired?.to
                    ? "now"
                    : dayjs(anime?.aired?.to)?.format("ddd MMM DD YYYY")}
                </p>
                <p>Rating : {anime?.rating}</p>
              </div>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </>
  );
}
export default ListCard;
