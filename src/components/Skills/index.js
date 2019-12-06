import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListSubheader
} from "@material-ui/core";
import CustomSvgImage from "../../assets/svg/CustomSvgImage";
import SkillSvg from "../../assets/svg/skill.svg";

export default function SkillList(props) {
  const { skills } = props;
  return (
    <List
      desnse="true"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Skills
        </ListSubheader>
      }
    >
      {skills.map((skill, idx) => (
        <ListItem key={skill.id}>
          <ListItemIcon>
            <CustomSvgImage src_url={SkillSvg} size={24} />
          </ListItemIcon>
          <ListItemText primary={skill.value} />
        </ListItem>
      ))}
    </List>
  );
}
