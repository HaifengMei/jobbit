import React, { useEffect, useState } from "react";
import { Typography, CircularProgress, Grid } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";
import CustomContainer from "../CustomContainer";

import BottomNav from "../BottomNav";
import ApplicantDetails from "./ApplicantDeatils";
import CustomButton from "../Buttons/CustomButton";
import CardSkeleton from "../Skeleton/CardSkeleton";

const styles = theme => ({
  root: {
    height: "45vh",
    overflow: "auto",
    marginTop: 10,
    marginBottom: 10
  }
});

function JobApplicants(props) {
  const { classes } = props;

  const [applicants, setApplicsnts] = useState(null);
  useEffect(() => {
    if (firebase.getCurrentUsername()) {
      firebase.getApplicants().then(setApplicsnts);
    } else {
      props.history.replace("/login");
    }
  }, [firebase.getCurrentUsername()]);

  return (
    <CustomContainer>
      <Typography variant="h5">Applicants</Typography>
      <Grid container spacing={3} className={classes.root}>
        {applicants ? (
          applicants.map((applicant, idx) => (
            <Grid item xs={12} key={idx}>
              <ApplicantDetails applicant={applicant}>
                <CustomButton
                  text="Accept"
                  fullWidth={false}
                  color="primary"
                  size="small"
                />
              </ApplicantDetails>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <CardSkeleton />
            <CardSkeleton />
          </Grid>
        )}
      </Grid>

      <BottomNav active={0} />
    </CustomContainer>
  );
}

export default withRouter(withStyles(styles)(JobApplicants));
