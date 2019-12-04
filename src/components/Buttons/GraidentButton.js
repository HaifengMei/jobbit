import React from "react";
import { Button, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
    borderRadius: 20,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    padding: "0 30px",
    color: "white",
    height: 36,
    boxShadow: `0 3px 5px 2px rgba(255, 105, 135, .3)`
  }
});

function GradientButton(props) {
  const {
    type = null,
    text = "",
    url = null,
    callback = null,
    color = "default",
    variant = "contained",
    size = "medium",
    classes,
    startIcon = null,
    endIcon = null,
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
        startIcon={startIcon}
        endIcon={endIcon}
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

export default withStyles(styles)(GradientButton);
