import React from "react";
import {
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@material-ui/core";
import RecruiterIcon from "../../assets/svg/RecruiterIcon";
import JobHunterIcon from "../../assets/svg/JobHunterIcon";

export default function RoleForm(props) {
  const { role, setRole } = props;
  return (
    <FormControl>
      <RadioGroup
        id="role"
        name="role"
        value={role}
        onChange={e => setRole(e.target.value)}
        required
      >
        <FormControlLabel
          value="Recruiter"
          control={
            <Radio
              icon={<RecruiterIcon style={{opacity:"25%"}} fontSize="small"/>}
              checkedIcon={<RecruiterIcon />}
            />
          }
          label="Recruiter"
        />
        <FormControlLabel
          value="Job Hunter"
          control={
            <Radio
              icon={<JobHunterIcon style={{opacity:"25%"}} fontSize="small"/>}
              checkedIcon={<JobHunterIcon />}
            />
          }
          label="Job Hunter"
        />
      </RadioGroup>
    </FormControl>
  );
}
