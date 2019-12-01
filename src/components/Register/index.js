import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
  Paper,
  Button,
  StepContent,
  StepLabel,
  Step,
  Stepper,
  FormControl,
  Input,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@material-ui/core";
import HeaderLogo from "../HeaderLogo";
import { Link, withRouter } from "react-router-dom";
import firebase from "../firebase";
import RecruiterIcon from "../Assets/svg/RecruiterIcon";
import JobHunterIcon from "../Assets/svg/JobHunterIcon";
import SkillForm from "../../components/Skills/skillsForm";

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
  form: {
    width: "100%" // Fix IE 11 issue.
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 1
  },
  contentContainer: {
    width: "100%"
  },
  button: {
    marginTop: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 1
  },

  imageIcon: {
    height: "100%"
  },
  iconRoot: {
    textAlign: "center"
  }
});

function RegisterStepper(props) {
  const { classes } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [skills, setSkills] = useState([
    { id: 0, value: "Power Washing" },
    { id: 1, value: "Sku Scrapper Cleaning" },
    { id: 2, value: "Lawn Mowing" }
  ]);
  const [newSkill, setNewSkill] = useState("");

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
      await firebase.addUserData(userType, skills);
      props.history.replace("/dashboard");
    } catch (error) {
      alert(error.message);
      setActiveStep(2);
    }
  }

  function getSteps() {
    return ["Choose A Class", "Create Your Account", "Enter Your skills"];
  }

  const RoleForm = () => (
    <FormControl>
      <RadioGroup
        id="userType"
        name="userType"
        value={userType}
        onChange={e => setUserType(e.target.value)}
        required
      >
        <FormControlLabel
          value="Recruiter"
          control={
            <Radio
              icon={<RecruiterIcon />}
              checkedIcon={<RecruiterIcon color="secondary" />}
            />
          }
          label="Recruiter"
        />
        <FormControlLabel
          value="Job Hunter"
          control={
            <Radio
              icon={<JobHunterIcon />}
              checkedIcon={<JobHunterIcon color="secondary" />}
            />
          }
          label="Job Hunter"
        />
      </RadioGroup>
    </FormControl>
  );

  const AuthForm = () => {
    return (
      <div>
        <FormControl required fullWidth>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            name="name"
            autoComplete="off"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormControl>
        <FormControl required fullWidth>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input
            id="email"
            name="email"
            autoComplete="off"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl required fullWidth>
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
      </div>
    );
  };

  const addSkill = () => {
    setSkills([
      ...skills,
      {
        id: skills.length,
        value: newSkill
      }
    ]);
    setNewSkill("");
  };

  const removeSkill = idx => {
    skills.splice(idx, 1);
    setSkills([...skills]);
  };

  const DataForm = () => (
    <div>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="password">New Skill</InputLabel>
        <Input
          name={newSkill}
          id="newSkill"
          autoComplete="off"
          value={newSkill}
          onChange={e => setNewSkill(e.target.value)}
        />
      </FormControl>
      <ul>
        {skills.map(skill => (
          <li key={skill.id}>{skill.value}</li>
        ))}
      </ul>
    </div>
  );

  function getStepContent(step) {
    switch (step) {
      case 0:
        return RoleForm();
      case 1:
        return AuthForm();
      case 2:
        return (
          <SkillForm
            newSkill={newSkill}
            addSkill={addSkill}
            setNewSkill={setNewSkill}
            skills={skills}
            removeSkill={removeSkill}
          />
        );
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
                <form onSubmit={e => e.preventDefault() && false}>
                  <div className={classes.contentContainer}>
                    {getStepContent(index)}
                  </div>
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
                </form>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>
              All steps completed - you&apos;re ready submit
            </Typography>
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
