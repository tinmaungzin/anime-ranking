import { Grid } from "@mui/material";
import ListCard from "./ListCard";
import { Anime } from "../interfaces";



function List({animes} : Anime) {
  return (
    <>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ paddingBlock: "2em", marginBottom: "2em" }}
        >
          {animes?.length
            ? animes?.map((anime: Anime, index: number) => <ListCard key={index} anime={anime} index={index} />)
            : null}
        </Grid>
    </>
  );
}
export default List;
