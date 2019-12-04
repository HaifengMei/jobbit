import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Paper } from "@material-ui/core";
import HeaderLogo from "../HeaderLogo";
import BackButton from "../Buttons/BackButton";
import CustomAppBar from "../AppBar";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
    borderRadius: 10,
    position: "relative",
    zIndex: 2
  },
  

});

function CustomContainer(props) {
  const { children, classes, logo = true, backButton = true } = props;
  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        {/* <CustomAppBar /> */}
        {backButton && <BackButton />}
        {logo && <HeaderLogo />}
        {children}
      </Paper>
    </main>
  );
}

export default withStyles(styles)(CustomContainer);
