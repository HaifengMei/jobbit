import React from "react";
import { IconButton } from "@material-ui/core";
import BackIcon from "@material-ui/icons/ArrowBackRounded";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  button: {
    position: "absolute",
    top: theme.spacing.unit * 1,
    left: theme.spacing.unit * 1
  }
});

function BackButton(props) {
  const { classes, history, location } = props;
  const { pathname } = location;

  if (pathname !== "/") {
    return (
      <IconButton className={classes.button} onClick={() => history.goBack()}>
        <BackIcon />
      </IconButton>
    );
  }

  return null;
}

export default withRouter(withStyles(styles)(BackButton));
