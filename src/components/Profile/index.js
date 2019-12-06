import React, { useEffect, useState } from "react";
import { Typography, CircularProgress, Chip } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";
import SkillsList from "../Skills";
import CustomContainer from "../CustomContainer";
import CustomButton from "../Buttons/CustomButton";
import BottomNav from "../BottomNav";
import RecruiterSvg from "../../assets/svg/recruiter.svg";
import JobHunterSvg from "../../assets/svg/job_hunter.svg";
import CustomSvgImage from "../../assets/svg/CustomSvgImage";
import ProfileDetails from "./ProfileDetails";
import ListSkeleon from "../Skeleton/ListSkeleton";

const styles = theme => ({
  root: {
    height: "40vh",
    width: "100%",
    padding: 5,
    overflow: "auto"
  }
});

function Profile(props) {
  const { classes } = props;

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
      <Typography variant="h5">Profile</Typography>
      <Typography variant="h5">{firebase.getCurrentUsername()}</Typography>

      {userProfile ? (
        <div className={classes.root}>
          <ProfileDetails {...userProfile} />
        </div>
      ) : (
        <div className={classes.root}>
          <ListSkeleon />
        </div>
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
