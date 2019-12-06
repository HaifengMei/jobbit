import React, { useEffect, useState } from "react";
import { Typography, Grid, Tooltip, IconButton } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";
import CustomContainer from "../CustomContainer";
import BottomNav from "../BottomNav";
import JobDetails from "./JobDeatils";
import CustomButton from "../Buttons/CustomButton";
import CardSkeleton from "../Skeleton/CardSkeleton";

const styles = theme => ({
  jobContainer: {
    height: "40vh",
    overflow: "auto",
    marginTop: 10,
    marginBottom: 10
  }
});

function JobBoard(props) {
  const { classes } = props;

  const [listedJobs, setListedJobs] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (firebase.getCurrentUsername()) {
      firebase.getListedJobs().then(setListedJobs);
    } else {
      props.history.replace("/login");
    }
  }, [firebase.getCurrentUsername()]);

  async function applyJob(id, applicants = []) {
    setLoading(true);
    await firebase.updateListedJob(id, {
      applicants: [...applicants, ...[firebase.getCurrentUid()]]
    });
    await firebase.getListedJobs().then(setListedJobs);
    setLoading(false);
  }

  return (
    <CustomContainer>
      <Typography variant="h5">Job Board</Typography>
      <Grid container spacing={3} className={classes.jobContainer}>
        {listedJobs ? (
          listedJobs.map((job, idx) => (
            <Grid item xs={12} key={idx}>
              <JobDetails job={job} status={false}>
                <CustomButton
                  callback={() => applyJob(job.jobId, job.applicants)}
                  text={
                    job.applicants.includes(firebase.getCurrentUid())
                      ? "Applied"
                      : "Apply"
                  }
                  loading={loading}
                  fullWidth={false}
                  color={
                    job.applicants.includes(firebase.getCurrentUid())
                      ? "default"
                      : "primary"
                  }
                  disabled={job.applicants.includes(firebase.getCurrentUid())}
                />
              </JobDetails>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <CardSkeleton />
            <CardSkeleton />
          </Grid>
        )}
      </Grid>
      <BottomNav active={1} />
    </CustomContainer>
  );
}

export default withRouter(withStyles(styles)(JobBoard));
