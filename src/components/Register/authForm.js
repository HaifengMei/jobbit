import React, { useState } from "react";
import { FormControl, Input, InputLabel, withStyles } from "@material-ui/core";

const styles = theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  }
});

function AuthForm(props) {
  const { classes, user, setUser } = props;
  const { email, name, password } = user;

  const updateField = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  return (
    <form className={classes.form} onSubmit={e => e.preventDefault() && false}>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={updateField}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="email">Email Address</InputLabel>
        <Input
          id="email"
          name="email"
          value={email}
          onChange={updateField}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          name="password"
          type="password"
          id="password"
          value={password}
          onChange={updateField}
        />
      </FormControl>
    </form>
  );
}

export default withStyles(styles)(AuthForm);
