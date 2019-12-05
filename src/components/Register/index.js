import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
  Paper,
  Button,
  StepContent,
  StepLabel,
  Step,
  Stepper
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import firebase from "../firebase";
import SkillForm from "../Skills/SkillsForm";
import AuthForm from "./AuthForm";
import RoleForm from "./RoleForm";
import CustomButton from "../Buttons/CustomButton";
import CustomContainer from "../CustomContainer";
import CustomSvgImage from "../../assets/svg/CustomSvgImage";
import RegisterSvg from "../../assets/svg/register.svg";
import DataForm from "./DataForm";

const styles = theme => ({
  form: {
    width: "100%" // Fix IE 11 issue.
  },
  actionsContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  imageIcon: {
    height: "100%"
  },
  iconRoot: {
    textAlign: "center"
  },
  stepperRoot: {
    width: "100% !important"
  }
});

function RegisterStepper(props) {
  const { classes } = props;
  const [activeStep, setActiveStep] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      await firebase.register(name, email, password);
      await firebase.addUserData(role, skills, phone, addresses, bio);
      props.history.replace("/dashboard");
    } catch (error) {
      alert(error.message);
      setActiveStep(2);
    }
  }

  function getSteps() {
    return [
      "Choose a Job Class",
      "Create Your Account",
      "Build Your Jobbit Profile"
    ];
  }

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

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <RoleForm role={role} setRole={setRole} />;
      case 1:
        return (
          <AuthForm
            name={name}
            password={password}
            email={email}
            setEmail={setEmail}
            setPassword={setPassword}
            setName={setName}
          />
        );
      case 2:
        return (
          <div>
            <DataForm
              phone={phone}
              setPhone={setPhone}
              address={address}
              setAddress={setAddress}
              addresses={addresses}
              setAddresses={setAddresses}
              setBio={setBio}
              bio={bio}
            />
            {role === "Job Hunter" && (
              <SkillForm
                newSkill={newSkill}
                addSkill={addSkill}
                setNewSkill={setNewSkill}
                skills={skills}
                removeSkill={removeSkill}
              />
            )}
          </div>
        );
      default:
        return <Typography>Unknown step</Typography>;
    }
  }

  return (
    <CustomContainer>
      <CustomSvgImage src_url={RegisterSvg} margin={10} />
      <Typography variant="h5">Register Account</Typography>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        className={classes.stepperRoot}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <form onSubmit={e => e.preventDefault() && false}>
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
              </form>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper elevation={0}>
          <Typography>
            All steps completed - you&apos;re ready to set sail
          </Typography>
          <CustomButton
            color="primary"
            callback={onRegister}
            text="Submit"
            loading={loading}
          />
          <CustomButton
            variant="outlined"
            color="secondary"
            callback={handleReset}
            text="Continue Editing"
          />
        </Paper>
      )}
      <CustomButton variant="outlined" url="/login" text="Login" />
    </CustomContainer>
  );
}

export default withRouter(withStyles(styles)(RegisterStepper));
