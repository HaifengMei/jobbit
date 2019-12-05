import React, { useEffect, useState } from "react";
import { Typography, CircularProgress } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";
import SkillsList from "../Skills";
import CustomContainer from "../CustomContainer";
import CustomButton from "../Buttons/CustomButton";
import BottomNav from "../BottomNav";

const styles = theme => ({});

function Profile(props) {
  // const { classes } = props;

  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    if (firebase.getCurrentUsername()) {
      firebase.getCurrentUserProfile().then(setUserProfile);
    } else {
      props.history.replace("/login");
    }
  }, [firebase.getCurrentUsername()]);

  return (
    <CustomContainer>
      <Typography variant="h5">{firebase.getCurrentUsername()}</Typography>
      <Typography variant="h5">
        {userProfile ? userProfile.role : <CircularProgress size={20} />}
      </Typography>
      {userProfile && userProfile.skills ? (
        <SkillsList skills={userProfile.skills} />
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
