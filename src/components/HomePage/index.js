import React from "react";
import { Typography, Paper, Avatar, Fab } from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import jobbitLogo from "../Assets/images/jobbit-logo.png";

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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    width: "50% !important"
    // borderRadius: "10%"
  },
  media: {
    height: 160,
    width: 300
  }
});

function HomePage(props) {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <CardMedia
          className={classes.media}
          image={jobbitLogo}
          title="Jobbit Logo"
        />
        <Avatar className={classes.avatar}>
          <VerifiedUserOutlined />
        </Avatar>
        <Typography variant="h5" gutterBottom>
          Welcome Job Hunters!
        </Typography>
        <Fab
          variant="extended"
          size="medium"
          color="secondary"
          aria-label="add"
          className={classes.button}
          component={Link}
          to="/register"
        >
          Register
        </Fab>
        <Fab
          variant="extended"
          size="medium"
          color="secondary"
          aria-label="add"
          className={classes.button}
          component={Link}
          to="/login"
        >
          Login
        </Fab>
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="add"
          className={classes.button}
          component={Link}
          to="/dashboard"
        >
          Dashboard
        </Fab>
      </Paper>
    </main>
  );
}

export default withStyles(styles)(HomePage);
