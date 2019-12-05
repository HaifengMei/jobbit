import React, { useEffect, useState } from "react";
import { Typography, CircularProgress } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";
import CustomContainer from "../CustomContainer";

import BottomNav from "../BottomNav";

const styles = theme => ({});

function Dashboard(props) {
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
      <BottomNav />
    </CustomContainer>
  );
}

export default withRouter(withStyles(styles)(Dashboard));
