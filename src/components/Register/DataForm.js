import React from "react";
import { FormControl, Input, InputLabel, Divider } from "@material-ui/core";
import MuiPhoneNumber from "material-ui-phone-number";
import AddressInput from "material-ui-address-input";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  root: {
    marginBottom: 20
  }
});

function DataForm(props) {
  const {
    address,
    setAddress,
    addresses,
    setAddresses,
    bio,
    setBio,
    phone,
    setPhone,
    classes
  } = props;

  function handleChangePhone(value) {
    setPhone(value);
  }

  function handleAddAddress(address) {
    setAddresses([...addresses, address]);
  }

  function handleChangeAddress(addressIndex) {
    setAddress(addressIndex);
  }
  return (
    <FormControl className={classes.root} fullWidth>
      <FormControl required>
        <MuiPhoneNumber
          id="phone"
          name="phone"
          label="Mobile Number"
          defaultCountry={"tt"}
          value={phone}
          onChange={handleChangePhone}
        />
      </FormControl>
      <FormControl>
        <AddressInput
          onAdd={handleAddAddress}
          onChange={handleChangeAddress}
          value={address}
          allAddresses={addresses}
          label="Address"
        />
        <Divider />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="bio">Short Bio</InputLabel>
        <Input
          name="bio"
          id="bio"
          value={bio}
          onChange={e => setBio(e.target.value)}
          placeholder="Tell me something about yourself"
          multiline
        />
      </FormControl>
    </FormControl>
  );
}

export default withStyles(styles)(DataForm);
