import React from "react";
import {
  FormControl,
  Input,
  InputLabel
} from "@material-ui/core";


export default function AuthForm(props) {
  const { name, setName, email, setEmail, password, setPassword} = props;
  return (
    <FormControl fullWidth>
      <FormControl required>
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input
          id="name"
          name="name"
          autoComplete="off"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </FormControl>
      <FormControl required>
        <InputLabel htmlFor="email">Email Address</InputLabel>
        <Input
          id="email"
          name="email"
          autoComplete="off"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl required>
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
    </FormControl>
  );
}
