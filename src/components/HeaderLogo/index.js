import CardMedia from "@material-ui/core/CardMedia";
import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";

//Logo
import jobbitLogo from "../Assets/images/jobbit-logo.png";

const styles = theme => ({
  media: {
    height: 160,
    width: 300,
    marginBottom: theme.spacing.unit*3
  }
});

function HeaderLogo(props) {
  const { classes } = props;
  return (
    <CardMedia
      className={classes.media}
      image={jobbitLogo}
      title="Jobbit Logo"
    />
  );
}

export default withStyles(styles)(HeaderLogo);
