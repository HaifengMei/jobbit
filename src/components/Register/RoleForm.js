import React from "react";
import {
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@material-ui/core";
import RecruiterSvg from "../../assets/svg/recruiter.svg";
import JobHunterSvg from "../../assets/svg/job_hunter.svg";

import CustomSvgImage from "../../assets/svg/CustomSvgImage";

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
              icon={
                <CustomSvgImage
                  src_url={RecruiterSvg}
                  size={24}
                  opacity="25%"
                />
              }
              checkedIcon={<CustomSvgImage src_url={RecruiterSvg} size={30} />}
            />
          }
          label="Recruiter"
        />
        <FormControlLabel
          value="Job Hunter"
          control={
            <Radio
              icon={
                <CustomSvgImage
                  src_url={JobHunterSvg}
                  size={24}
                  opacity="25%"
                />
              }
              checkedIcon={<CustomSvgImage src_url={JobHunterSvg} size={30} />}
            />
          }
          label="Job Hunter"
        />
      </RadioGroup>
    </FormControl>
  );
}
