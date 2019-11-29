import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
  Paper,
  Avatar,
  Button,
  StepContent,
  StepLabel,
  Step,
  Stepper,
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import HeaderLogo from "../HeaderLogo";
import { Link, withRouter } from "react-router-dom";
import firebase from "../firebase";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit*1,
  },
  button: {
    marginTop: theme.spacing.unit*1,
    marginRight: theme.spacing.unit*1,
  },
  resetContainer: {
    padding: theme.spacing.unit*3,
  }
});

function RegisterStepper(props) {
  const { classes } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  async function onRegister() {
    try {
      await firebase.register(name, email, password);
      await firebase.adduserType(userType);
      props.history.replace("/dashboard");
    } catch (error) {
      alert(error.message);
      setActiveStep(2);
    }
  }

  function getSteps() {
    return ["Choose a role", "Complete account", "Complete Jobbit form"];
  }

  function BasicRegForm() {
    return (
      <form
        className={classes.form}
        onSubmit={e => e.preventDefault() && false}
      >
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            name="name"
            autoComplete="off"
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input
            id="email"
            name="email"
            autoComplete="off"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            autoComplete="off"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormControl>
        {/* <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="type">Type</InputLabel>
          <Select
            id="type"
            value={userType}
            onChange={e => setUserType(e.target.value)}
          >
            <MenuItem value={1}>Recruiter</MenuItem>
            <MenuItem value={2}>userType Seeker</MenuItem>
          </Select>
        </FormControl> */}
      </form>
    );
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Typography>Looking to hire or looking tor jobs?</Typography>;
      case 1:
        return <BasicRegForm />;
      case 2:
        return <Typography>Role specific form</Typography>;
      default:
        return <Typography>Unknown step</Typography>;
    }
  }

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <HeaderLogo />
        <Typography variant="h5">Register Account</Typography>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                {getStepContent(index)}
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      size="small"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re ready submit</Typography>
            <Button
              onClick={onRegister}
              className={classes.button}
              color="primary"
              variant="contained"
              fullWidth
            >
              Submit
            </Button>
          </Paper>
        )}
        <Button
          type="submit"
          fullWidth
          color="secondary"
          component={Link}
          to="/login"
          className={classes.submit}
        >
          Go back to Login
        </Button>
      </Paper>
    </main>
  );
}

export default withRouter(withStyles(styles)(RegisterStepper));
