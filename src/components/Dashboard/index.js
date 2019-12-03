import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  Button
} from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import SkillsList from "../Skills";
import CustomContainer from "../CustomContainer";
import CustomButton from "../Buttons/CustomButton";
import BackButton from "../Buttons/BackButton";

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
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

function Dashboard(props) {
  const { classes } = props;

  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    if (firebase.getCurrentUsername()) {
      firebase.getCurrentUserData().then(setUserDetails);
    }
  }, [firebase.getCurrentUsername()]);

  if (!firebase.getCurrentUsername()) {
    props.history.replace("/login");
    return null;
  }

  return (
    <CustomContainer>
      <Typography variant="h5">{firebase.getCurrentUsername()}</Typography>
      <Typography variant="h5">
        {userDetails ? userDetails.role : <CircularProgress size={20} />}
      </Typography>
      {userDetails && userDetails.skills ? (
        <SkillsList skills={userDetails.skills} />
      ) : (
        <CircularProgress size={20} />
      )}

      <CustomButton
        type="submit"
        variant="outlined"
        color="secondary"
        callback={logout}
        text="Logout"
      />
    </CustomContainer>
  );

  async function logout() {
    await firebase.logout();
    props.history.push("/");
  }
}

export default withRouter(withStyles(styles)(Dashboard));
