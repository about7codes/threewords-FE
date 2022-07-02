export const styles = {
  imgBox: {
    display: "flex",
    marginBottom: "15px",
    "@media (max-width: 600px)": {
      justifyContent: "center",
    },
  },
  img: {
    backgroundColor: "#fff3f4",
    display: "inline-block",
    borderRadius: "50%",
  },
  databox: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    "@media (max-width: 400px)": {
      gridTemplateColumns: "repeat(auto-fit, minmax(272px, 1fr))",
    },
  },
  info: {
    padding: "15px",
    width: "100%",
    "@media (min-width: 900px)": {
      //   width: "50%",
    },
  },
  key: {
    paddingBottom: "8px",
    color: "rgba(0,0,0,0.4)",
  },
  val: {
    color: "#202020",
  },
  btnBox: {
    display: "flex",
    justifyContent: "flex-end",
  },
  del: {
    width: "100%",
    "@media (min-width: 900px)": {
      width: "auto",
    },
  },
};
