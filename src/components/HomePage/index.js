import React from "react";
import { Typography, Icon, Grid, Paper } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomButton from "../Buttons/CustomButton";
import CustomContainer from "../CustomContainer";
import bgUrl from "../../assets/images/background.jpg";
import CustomSvgImage from "../../assets/svg/CustomSvgImage";
import RecruiterSvg from "../../assets/svg/recruiter.svg";
import JobHunterSvg from "../../assets/svg/job_hunter.svg";
import PaymentSvg from "../../assets/svg/payment.svg";

import GraidentButton from "../Buttons/GraidentButton";
import "./index.css";

const styles = theme => ({
  bg: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "80vh",
    // opacity: 0.5,
    borderRadius: 10,
    zIndex: -1
  },
  heading: {
    // paddingBottom: 195,
    // color: "white",
    // textAlign: "center",
    // fontSize: 16,
    // fontStyle: "italic"
  },
  button: {
    margin: theme.spacing(1),
    borderRadius: 20,
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    padding: "0 30px",
    color: "white",
    height: 36,
    boxShadow: `0 3px 5px 2px rgba(255, 105, 135, .3)`
  },
  icon: {
    textAlign: "center"
  },
  grid: {
    marginTop: "5vh",
    marginBottom: "3vh"
  }
});

function HomePage(props) {
  const { classes } = props;
  return (
    <CustomContainer backButton={false}>
      <img src={bgUrl} className={classes.bg} />
      <div class="blockquote-wrapper">
        <div class="blockquote">
          <h1>Jobbit, the hub where you get work done</h1>
          <h4>&mdash;Feng</h4>
        </div>
      </div>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={4}>
          <div className={classes.icon}>
            <CustomSvgImage src_url={RecruiterSvg} size={75} />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.icon}>
            <CustomSvgImage src_url={PaymentSvg} size={48} />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.icon}>
            <CustomSvgImage src_url={JobHunterSvg} size={75} />
          </div>
        </Grid>
      </Grid>

      <GraidentButton
        // variant="outlined"
        color="primary"
        url="/register"
        text="Register"
      />

      <GraidentButton
        // variant="outlined"
        color="primary"
        url="/login"
        text="Login"
      />

      {/* <CustomButton
        // variant="outlined"
        color="secondary"
        url="/dashboard"
        text="Dashboard"
      /> */}
    </CustomContainer>
  );
}

export default withStyles(styles)(HomePage);
