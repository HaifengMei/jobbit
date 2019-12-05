import React from "react";
import { Button, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = theme => ({
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: 20,
    position: "relative"
  },
  loader: {
    position: "absolute"
  }
});

function CustomButton(props) {
  const {
    type = null,
    text = "",
    url = null,
    callback = null,
    color = "default",
    variant = "contained",
    size = "small",
    classes,
    startIcon = null,
    endIcon = null,
    fullWidth = true,
    disabled = false,
    loading = false
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
        disabled={disabled || loading}
      >
        {loading ? (
          <div>
            <CircularProgress size={26} className={classes.loader} />
            {text}
          </div>
        ) : (
          text
        )}
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
      disabled
    >
      {text}
    </Button>
  );
}

export default withStyles(styles)(CustomButton);
