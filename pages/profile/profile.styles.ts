export const styles = {
  databox: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
};
