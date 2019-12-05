import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";
import CustomContainer from "../CustomContainer";
import BottomNav from "../BottomNav";
import CustomButton from "../Buttons/CustomButton";
import JobDetails from "./JobDeatils";
import moment from "moment";

const styles = theme => ({
  jobContainer: {
    height: "50vh",
    overflow: "auto",
    marginTop: 10,
    marginBottom: 10
  }
});

function Jobs(props) {
  const { classes } = props;

  const [userJobs, setUserJobs] = useState([]);
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
    firebase.getCurrentUserJobs().then(setUserJobs);
  }

  async function updateJob(id, update) {
    await firebase.updateJob(id, update);
    firebase.getCurrentUserJobs().then(setUserJobs);
  }

  return (
    <CustomContainer>
      <Typography variant="h5">Jobs</Typography>
      <Grid container spacing={3} className={classes.jobContainer}>
        {userJobs.length > 0 &&
          userJobs.map((job, idx) => (
            <Grid item xs={12} key={idx}>
              <JobDetails
                job={job}
                deleteJob={deleteJob}
                updateJob={updateJob}
              />
            </Grid>
          ))}
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

export default withRouter(withStyles(styles)(Jobs));
