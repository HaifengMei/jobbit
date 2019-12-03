import React, { useState } from "react";
import {
  Typography,
  Avatar,
  FormControl,
  Input,
  InputLabel
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import firebase from "../firebase";
import CustomButton from "../Buttons/CustomButton";
import CustomContainer from "../CustomContainer";

const styles = theme => ({
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  }
});

function SignIn(props) {
  const { classes } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <CustomContainer>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h5">Sign in</Typography>
      <form
        className={classes.form}
        onSubmit={e => e.preventDefault() && false}
      >
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input
            id="email"
            name="email"
            autoComplete="off"
            autoFocus
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
        <CustomButton
          color="primary"
          callback={login}
          type={"submit"}
          text="Sign In"
        />
        <CustomButton url="/register" text="Register" variant="outlined" />
      </form>
    </CustomContainer>
  );

  async function login() {
    try {
      await firebase.login(email, password);
      props.history.replace("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  }
}

export default withRouter(withStyles(styles)(SignIn));
