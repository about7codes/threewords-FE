import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { styles as classes } from "./card.styles";
import CardEdit from "../CardEdit/CardEdit";
import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { useMutation, useQueryClient } from "react-query";
import { useApp } from "../../hooks/app.hooks";
import { useDeletePhrase } from "../../hooks/phrase.hooks";

type CardProps = {
  phrase: {
    _id: string;
    words: string;
    owner: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

const Card = (props: CardProps) => {
  const [editMode, setEditMode] = useState(false);
  const { mutate: delPhrase, isLoading, error } = useDeletePhrase();
  console.log("DelError2: ", error?.response?.data);

  const handleDelete = () => {
    console.log("Delete: ", props.phrase._id);
    const authToken = parseCookies().aToken;
    delPhrase({
      token: authToken,
      id: props.phrase._id,
    });
  };

  return (
    <>
      {editMode ? (
        <CardEdit phrase={props.phrase} setEditMode={setEditMode} />
      ) : (
        <Paper sx={classes.cardPaper}>
          <Grid container sx={classes.cardContainer}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={classes.cardWord}>
                {props.phrase.words}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={classes.cardBottom}>
              <Box>
                <Box sx={classes.cardDt}>
                  <Typography variant="caption">Created at: </Typography>
                  <Typography variant="caption">
                    {new Date(props.phrase.createdAt).toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={classes.cardDt}>
                  <Typography variant="caption">Updated at: </Typography>
                  <Typography variant="caption">
                    {new Date(props.phrase.updatedAt).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "baseline" }}>
                {isLoading ? (
                  <CircularProgress
                    size={20}
                    sx={{
                      margin: "8px",
                    }}
                  />
                ) : (
                  <IconButton
                    color="primary"
                    onClick={handleDelete}
                    disabled={isLoading}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}

                <IconButton
                  color="primary"
                  onClick={() => setEditMode(true)}
                  disabled={isLoading}
                >
                  <EditOutlinedIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default Card;
