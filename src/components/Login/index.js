import React, { useState } from "react";
import { Typography, FormControl, Input, InputLabel } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import firebase from "../firebase";
import CustomButton from "../Buttons/CustomButton";
import CustomContainer from "../CustomContainer";
import CustomSvgImage from "../../assets/svg/CustomSvgImage";
import LoginSvg from "../../assets/svg/login.svg";

const styles = theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  }
});

function SignIn(props) {
  const { classes } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <CustomContainer>
      <CustomSvgImage src_url={LoginSvg} margin={10} />
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
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormControl>
        <CustomButton
          color="primary"
          callback={login}
          type={"submit"}
          text="Sign In"
          loading={loading}
        />
        <CustomButton url="/register" text="Register" variant="outlined" />
      </form>
    </CustomContainer>
  );

  async function login() {
    try {
      setLoading(true);
      await firebase.login(email, password);
      props.history.replace("/dashboard");
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  }
}

export default withRouter(withStyles(styles)(SignIn));
