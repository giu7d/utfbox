const styles = {
  mainContainer: {
    display: "flex",
    flex: 1,
    width: "100%",
    flexDirection: "row",
    marginTop: 100,
    position: "fixed",
    overflow: "hidden"
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 4,
    height: "calc(100vh - 100px)",
    padding: 24,
    overflowX: "hidden",
    overflowY: "scroll"
  }
};

export default styles;
