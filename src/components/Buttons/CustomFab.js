import React from "react";
import { Fab, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 1,
    width: "50% !important"
  }
});

function CustomFab(props) {
  const {
    text = "",
    url = null,
    color = "default",
    variant = "extended",
    size = "medium",
    classes
  } = props;
  if (url) {
    return (
      <Fab
        variant={variant}
        size={size}
        color={color}
        className={classes.button}
        component={Link}
        to={url}
      >
        {text}
      </Fab>
    );
  }

  return (
    <Fab variant={variant} size={size} color={color} className={classes.button}>
      {text}
    </Fab>
  );
}

export default withStyles(styles)(CustomFab);
