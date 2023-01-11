import axios, { AxiosError } from "axios";
import React from "react";
import * as Yup from "yup";
import { FormikProps, useFormik } from "formik";
import { parseCookies } from "nookies";
import {
  Box,
  Grid,
  Paper,
  TextField,
  IconButton,
  CircularProgress,
  Slide,
} from "@mui/material";
import AddIcon from "@mui/icons-material/AddBox";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { styles as classes } from "../../styles/create.styles";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { useApp } from "../../hooks/app.hooks";
import HeaderInfo from "../../components/HeaderInfo/HeaderInfo";

interface IFormValues {
  words: string;
}

export const addPhrase = async ({
  token,
  words,
}: {
  token: string;
  words: string;
}) => {
  const response = await axios.post(
    "https://maxthree.cyclic.app/phrase/new",
    { words },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const useAddPhrase = () => {
  const [, dispatch] = useApp();
  const cache = useQueryClient();

  return useMutation(addPhrase, {
    onSuccess: (data) => {
      // Update cache data
      cache.invalidateQueries("allphrases");

      dispatch({
        type: "SET_NOTIFY",
        payload: {
          type: "success",
          message: data.message || "Added successfully",
          open: true,
        },
      });
      console.log("Successdata", data);
    },
    onError: (error: AxiosError) => {
      dispatch({
        type: "SET_NOTIFY",
        payload: {
          type: "error",
          message:
            // @ts-ignore
            error.response?.data?.error ||
            error.message ||
            "Something went wrong",
          open: true,
        },
      });
      console.log("QueryError", error);
    },
  });
};

const CreatePhrase = () => {
  const router = useRouter();
  const { mutateAsync: addPhrase, isLoading } = useAddPhrase();

  const handleSubmit = async (values: IFormValues) => {
    console.log("values", values);
    const authToken = parseCookies().aToken;
    if (!authToken) router.reload();

    const data = await addPhrase({
      token: authToken,
      words: values.words,
    });

    formik.resetForm();

    console.log("Newdata", data);
  };

  const formikSchema = Yup.object().shape({
    words: Yup.string().required("Please enter your phrase."),
  });

  const formik: FormikProps<IFormValues> = useFormik<IFormValues>({
    enableReinitialize: true,
    initialValues: {
      words: "",
    },
    validationSchema: formikSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <HeaderInfo title="Create a phrase Threemax" />
      <h1>Create Your Phrase</h1>
      <Slide in={true} direction="up">
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
              <Box></Box>
              <Box sx={{ display: "flex", alignItems: "baseline" }}>
                <IconButton
                  color="primary"
                  onClick={() => console.log("first")}
                >
                  <BackspaceIcon />
                </IconButton>
                {false ? (
                  <CircularProgress
                    size={20}
                    sx={{
                      margin: "8px 10px",
                    }}
                  />
                ) : (
                  <IconButton
                    color="primary"
                    onClick={() => formik.handleSubmit()}
                  >
                    <AddIcon />
                  </IconButton>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Slide>
    </div>
  );
};

export default CreatePhrase;
