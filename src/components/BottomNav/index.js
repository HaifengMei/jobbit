import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Divider
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import QuestSvgIcon from "./QuestSvgIcon";
import RecruitsSvgIcon from "./RecruitsSvgIcon";
import ProfileSvgIcon from "./ProfileSvgIcon";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    width: "100%",
    // background: "grey",
    marginBottom: -10
  },
  botnav: {
    // marginTop: 10
  }
});
function BottomNav(props) {
  const { classes, active = 2, disabled = false } = props;
  const [value, setValue] = React.useState(active);

  return (
    <div className={classes.root}>
      <Divider />
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.botnav}
      >
        <BottomNavigationAction
          component={Link}
          to={"/job_applicants"}
          label="Applications"
          icon={<RecruitsSvgIcon />}
          disabled={disabled}
        />
        <BottomNavigationAction
          component={Link}
          to={"/jobs"}
          label="Jobs"
          icon={<QuestSvgIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to={"/profile"}
          label="Profile"
          icon={<ProfileSvgIcon />}
        />
      </BottomNavigation>
    </div>
  );
}

export default withStyles(styles)(BottomNav);
