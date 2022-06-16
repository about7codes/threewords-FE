import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useApp } from "../../hooks/app.hooks";

const Notify = () => {
  const [state, dispatch] = useApp();
  const { notify } = state;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch({
      type: "UNSET_NOTIFY",
      payload: {
        ...notify,
        open: false,
      },
    });
  };
  return (
    <Snackbar open={notify.open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        elevation={3}
        onClose={handleClose}
        severity={notify.type}
        sx={{ width: "100%" }}
      >
        {notify.message}
      </Alert>
    </Snackbar>
  );
};

export default Notify;
