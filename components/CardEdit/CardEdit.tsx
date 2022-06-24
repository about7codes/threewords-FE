import React from "react";
import * as Yup from "yup";
import { useFormik, FormikProps } from "formik";
import {
  Box,
  Grid,
  Paper,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

import { styles as classes } from "./cardEdit.styles";

type CardEditProps = {
  phrase: { [key: string]: any };
  setEditMode: (mode: boolean) => void;
};

interface IFormValues {
  words: string;
}

const CardEdit = (props: CardEditProps) => {
  const handleSubmit = () => {};

  const formikSchema = Yup.object().shape({
    words: Yup.string().required("Please enter your email."),
  });

  const formik: FormikProps<IFormValues> = useFormik<IFormValues>({
    enableReinitialize: true,
    initialValues: {
      words: props.phrase.words,
    },
    validationSchema: formikSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Paper sx={classes.cardPaper}>
      <Grid container sx={classes.cardContainer}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="words"
            label="Words"
            name="words"
            variant="outlined"
            value={formik.values.words}
            onChange={formik.handleChange}
            error={formik.touched.words && Boolean(formik.errors.words)}
            helperText={formik.touched.words && formik.errors.words}
          />
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
          <Box>
            <IconButton
              color="primary"
              onClick={() => props.setEditMode(false)}
            >
              <ClearIcon />
            </IconButton>
            <IconButton color="primary" onClick={(e) => console.log("update")}>
              <CheckIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CardEdit;
