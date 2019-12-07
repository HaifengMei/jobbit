import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../firebase";
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
    height: "100%",
    zIndex: -1,
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      borderRadius: 10,
    },
  },
  heading: {},
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
    marginTop: "3vh"
  },
  nav: { width: "80%", marginTop: "10vh" }
});

function HomePage(props) {
  useEffect(() => {
    if (firebase.getCurrentUsername()) {
      props.history.replace("/dashboard");
    }
  }, [firebase.getCurrentUsername()]);
  const { classes } = props;
  return (
    <CustomContainer backButton={false}>
      <img src={bgUrl} className={classes.bg} />
      <div className="blockquote-wrapper">
        <div className="blockquote">
          <h1>Jobbit, the hub where you get work done</h1>
          <h4>&mdash; Feng</h4>
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
      <div className={classes.nav}>
        <GraidentButton color="primary" url="/register" text="Register" />
        <GraidentButton color="primary" url="/login" text="Login" />
      </div>

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
