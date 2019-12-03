import React from "react";
import { Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomButton from "../Buttons/CustomButton";
import CustomContainer from "../CustomContainer";

const styles = theme => ({

});

function HomePage(props) {
  return (
    <CustomContainer>
      <Typography variant="h5" gutterBottom>
        Welcome Job Hunters!
      </Typography>
      <CustomButton color="secondary" url="/register" text="Register" />
      <CustomButton color="secondary" url="/login" text="Login" />
      <CustomButton color="primary" url="/dashboard" text="Dashboard" />
    </CustomContainer>
  );
}

export default withStyles(styles)(HomePage);
