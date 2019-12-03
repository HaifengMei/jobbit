import React from "react";
import { Button, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 1,
    borderRadius : 20
  }
});

function CustomButton(props) {
  const {
    type = "",
    text = "",
    url = null,
    callback = null,
    color = "default",
    variant = "contained",
    size = "medium",
    classes,
    fullWidth = true
  } = props;
  if (url) {
    return (
      <Button
        fullWidth={fullWidth}
        variant={variant}
        color={color}
        size={size}
        className={classes.button}
        component={Link}
        to={url}
      >
        {text}
      </Button>
    );
  } else if (callback) {
    return (
      <Button
        fullWidth={fullWidth}
        variant={variant}
        color={color}
        size={size}
        className={classes.button}
        type={type}
        onClick={callback}
      >
        {text}
      </Button>
    );
  }

  return (
    <Button
      fullWidth={fullWidth}
      variant={variant}
      color={color}
      size={size}
      className={classes.button}
    >
      {text}
    </Button>
  );
}

export default withStyles(styles)(CustomButton);
