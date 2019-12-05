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
import BottomNav from "../BottomNav";

const styles = theme => ({});

function Profile(props) {
  const { classes } = props;

  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    if (firebase.getCurrentUsername()) {
      firebase.getCurrentUserData().then(setUserDetails);
    } else {
      props.history.replace("/login");
    }
  }, [firebase.getCurrentUsername()]);

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
      <BottomNav active={2} />
    </CustomContainer>
  );

  async function logout() {
    await firebase.logout();
    props.history.push("/");
  }
}

export default withRouter(withStyles(styles)(Profile));
