import CardMedia from "@material-ui/core/CardMedia";
import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";
import { Link } from "react-router-dom";

//Logo
import jobbitLogo from "../../assets/images/jobbit-logo.png";

const styles = theme => ({
  media: {
    height: 110,
    width: 200,
    marginBottom: theme.spacing.unit * 3
  }
});

function HeaderLogo(props) {
  const { classes } = props;
  return (
    <CardMedia
      className={classes.media}
      image={jobbitLogo}
      title="Jobbit Logo"
      component={Link}
      to="/"
    />
  );
}

export default withStyles(styles)(HeaderLogo);
