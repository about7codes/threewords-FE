import { Theme } from "@mui/material";

export const styles = {
  sign: {
    display: "flex",
    alignItems: "center",
    height: "calc(100% - 64px)",
  },
  signInner: {
    maxWidth: "370px",
    margin: "0 auto",
    flexDirection: "column",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "rgb(0 0 0 / 8%) 0px 0px 18px",
  },
  logo: {
  },
  signInnerHeader: {
    textAlign: "center",
  },
  formGroup: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
  },
  field: {
    alignItems: "flex-end",
  },
  fieldInput: {
    flex: 1,
  },
  submit: {
    marginTop: "15px",
  },
  altBtn: {
    textDecoration: "none",
  },
  links: {
    marginTop: "5px",
    textAlign: "right",
  },
  link: {
    textDecoration: "none",
    color: "#000",
    fontSize: "14px",
    cursor: "pointer",
    "&:hover": {
      color: (theme: Theme) => theme.palette.primary.main,
    },
  },
};
