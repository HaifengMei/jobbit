import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Paper } from "@material-ui/core";
import HeaderLogo from "../HeaderLogo";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  }
});

function CustomContainer(props) {
  const { children, classes } = props;
  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <HeaderLogo />
        {children}
      </Paper>
    </main>
  );
}

export default withStyles(styles)(CustomContainer);
