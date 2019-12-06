import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Avatar
} from "@material-ui/core";
import CustomSvgImage from "../../assets/svg/CustomSvgImage";
import SkillSvg from "../../assets/svg/skill.svg";
import SkillList from "../Skills";
import RecruiterSvg from "../../assets/svg/recruiter.svg";
import JobHunterSvg from "../../assets/svg/job_hunter.svg";
import { makeStyles } from "@material-ui/core/styles";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  avatar: {
    width: 30,
    height: 30,
    backgroundColor: theme.palette.primary.main
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default function ProfileDetails(props) {
  const { phone, role, adddresses, bio, skills } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  console.log(adddresses);
  return (
    <main>
      <List desnse="true">
        <ListItem>
          <ListItemIcon>
            {role == "Recruiter" ? (
              <CustomSvgImage src_url={RecruiterSvg} size={30} />
            ) : (
              <CustomSvgImage src_url={JobHunterSvg} size={30} />
            )}
          </ListItemIcon>
          <ListItemText primary={role} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Avatar className={classes.avatar}>Bio</Avatar>
          </ListItemIcon>
          <ListItemText primary={bio} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PhoneIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary={phone} />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <HomeIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Address" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem className={classes.nested}>
              <ListItemText primary={adddresses[0].addressLine1} />
            </ListItem>
            <ListItem className={classes.nested}>
              <ListItemText primary={adddresses[0].addressLine2} />
            </ListItem>
            <ListItem className={classes.nested}>
              <ListItemText primary={adddresses[0].city} />
            </ListItem>
            <ListItem className={classes.nested}>
              <ListItemText primary={adddresses[0].country} />
            </ListItem>
            <ListItem className={classes.nested}>
              <ListItemText primary={adddresses[0].region} />
            </ListItem>
            <ListItem className={classes.nested}>
              <ListItemText primary={adddresses[0].zip} />
            </ListItem>
          </List>
        </Collapse>
      </List>

      {skills.length > 0 && <SkillList skills={skills} />}
    </main>
  );
}
