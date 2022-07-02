import React from "react";
import Link from "next/link";
import {
  Box,
  Slide,
  CircularProgress,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import Card from "../../components/Card/Card";
import { useAllPhrases } from "../../hooks/phrase.hooks";
import HeaderInfo from "../../components/HeaderInfo/HeaderInfo";
import { styles as classes } from "./allPhrases.styles";

const AllPhrases = () => {
  const { data: allPhrases, isLoading, error } = useAllPhrases();

  if (error) {
    // @ts-ignore
    console.log("allPhrasesError", error.response.data.error);
  }

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <HeaderInfo title="All Phrases Threemax" />
      <Box sx={classes.head}>
        <h1>All Your Phrases</h1>
        <Box sx={classes.badge}>{allPhrases.phrases.length}</Box>
      </Box>
      {allPhrases && allPhrases.phrases.length == 0 ? (
        <Slide in={true} direction="up">
          <Paper
            sx={{ padding: "10px", display: "grid", placeContent: "center" }}
          >
            <Typography variant="h5" textAlign="center" gutterBottom>
              No phrase added.
            </Typography>
            <Link href="/create">
              <Button variant="contained">Add phrase</Button>
            </Link>
          </Paper>
        </Slide>
      ) : (
        allPhrases &&
        allPhrases.phrases.map((phrase: any) => (
          <Box key={phrase._id}>
            <Slide in={true} direction="up">
              <Box>
                <Card phrase={phrase} />
              </Box>
            </Slide>
          </Box>
        ))
      )}
    </div>
  );
};

export default AllPhrases;
