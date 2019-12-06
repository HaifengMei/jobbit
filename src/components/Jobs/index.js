import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";
import UserJobs from "./UserJobs";
import JobBoard from "./JobBoard";
const styles = theme => ({});

function Jobs(props) {
  const { classes } = props;

  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    if (firebase.getCurrentUsername()) {
      firebase.getCurrentUserProfile().then(setUserProfile);
    } else {
      props.history.replace("/login");
    }
  }, [firebase.getCurrentUsername()]);

  if (userProfile && userProfile.role == "Recruiter") {
    return <UserJobs />;
  } else if (userProfile && userProfile.role === "Job Hunter") {
    return <JobBoard />;
  }
  return null;
}

export default withRouter(withStyles(styles)(Jobs));
