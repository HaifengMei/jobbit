import React, { useEffect, useState } from "react";
import { Typography, Grid, Tooltip, IconButton } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";
import CustomContainer from "../CustomContainer";
import BottomNav from "../BottomNav";
import CustomButton from "../Buttons/CustomButton";
import JobDetails from "./JobDeatils";
import moment from "moment";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import PublishIcon from "@material-ui/icons/Public";
import { Skeleton } from "@material-ui/lab";
import CardSkeleton from "../Skeleton/CardSkeleton";

const styles = theme => ({
  jobContainer: {
    height: "40vh",
    overflow: "auto",
    marginTop: 10,
    marginBottom: 10
  }
});

function UserJobs(props) {
  const { classes } = props;

  const [userJobs, setUserJobs] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (firebase.getCurrentUsername()) {
      firebase.getCurrentUserJobs().then(setUserJobs);
    } else {
      props.history.replace("/login");
    }
  }, [firebase.getCurrentUsername()]);

  async function addJob() {
    // const job = {
    //   name: "Unpack Two Shipping Containers",
    //   description: "I a strong boi to unload these containers",
    //   reward: "2",
    //   currency: "Gold",
    //   status: "Unlisted",
    //   date: moment().format(),
    //   location: "#1 Gold Street, Goldenville, King's Landing, Westeros"
    // };

    // const job = {
    //   name: "Wash Wagon Interior and Exterior",
    //   description: "Need a young lad to help wash my wagon",
    //   reward: "5",
    //   currency: "Silver",
    //   status: "Listed",
    //   date: moment().format(),
    //   location: "#1 Gold Street, Goldenville, King's Landing, Westeros"
    // };

    const job = {
      name: "Power Washing Yard",
      description: "I need a cheap man to power wash meh yard",
      reward: "20",
      currency: "Silver",
      status: "Created",
      date: moment().format(),
      location: "#1 Gold Street, Goldenville, King's Landing, Westeros"
    };
    setLoading(true);
    const newJob = await firebase.addUserJobs(job);
    firebase.getCurrentUserJobs().then(setUserJobs);
    setLoading(false);
  }

  async function deleteJob(id) {
    await firebase.deleteUserJob(id);
    await firebase.removeListedJobs(id);
    firebase.getCurrentUserJobs().then(setUserJobs);
  }

  async function updateJob(id, update) {
    await firebase.updateUserJob(id, update);
    if (update.status == "Listed") {
      await firebase.addListedJobs(id);
    } else if (update.status == "Unlisted") {
      await firebase.removeListedJobs(id);
    }
    firebase.getCurrentUserJobs().then(setUserJobs);
  }

  return (
    <CustomContainer>
      <Typography variant="h5">UserJobs</Typography>
      <Grid container spacing={3} className={classes.jobContainer}>
        {userJobs ? (
          userJobs.map((job, idx) => (
            <Grid item xs={12} key={idx}>
              <JobDetails job={job} deleteJob={deleteJob} updateJob={updateJob}>
                <Tooltip title="Edit">
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                {job.status !== "Listed" ? (
                  <Tooltip title="List on Job Board">
                    <IconButton
                      onClick={() => updateJob(job.id, { status: "Listed" })}
                    >
                      <PublishIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Unlist from Job Board">
                    <IconButton
                      color="primary"
                      onClick={() => updateJob(job.id, { status: "Unlisted" })}
                    >
                      <PublishIcon />
                    </IconButton>
                  </Tooltip>
                )}

                <Tooltip title="Delete">
                  <IconButton
                    color="secondary"
                    onClick={() => deleteJob(job.id)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Tooltip>
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

      <CustomButton
        text={"New Job"}
        callback={addJob}
        color="primary"
        loading={loading}
      />

      <BottomNav active={1} />
    </CustomContainer>
  );
}

export default withRouter(withStyles(styles)(UserJobs));
