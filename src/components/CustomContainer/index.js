import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Paper } from "@material-ui/core";
import HeaderLogo from "../HeaderLogo";
import BackButton from "../Buttons/BackButton";
import CustomAppBar from "../AppBar";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";

const styles = theme => ({
  main: {
    width: "100%",
    display: "block", // Fix IE 11 issue.
    // marginLeft: theme.spacing(3),
    // marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 430,
      marginLeft: "auto",
      marginRight: "auto"
    },
    position: "relative",
  },
  paper: {
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(4),
      borderRadius: 10
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,


    position: "relative",
    zIndex: 2
  }
});

function CustomContainer(props) {
  const { children, classes, logo = true, backButton = true, width } = props;
  return (
    <main className={classes.main}>
      <Paper
        className={classes.paper}
        elevation={isWidthUp("sm", width) ? 1 : 0}
      >
        {backButton && <BackButton />}
        {logo && <HeaderLogo />}
        {children}
      </Paper>
    </main>
  );
}

export default withWidth()(withStyles(styles)(CustomContainer));
