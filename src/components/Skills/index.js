import React from "react";
import { List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import SkillsIcon from "../../assets/svg/SkillsIcon";

export default function SkillList(props) {
  const { skills } = props;
  return (
    <List desnse="true">
      {skills.map((skill, idx) => (
        <ListItem key={skill.id}>
          <ListItemIcon>
            <SkillsIcon />
          </ListItemIcon>
          <ListItemText primary={skill.value} />
        </ListItem>
      ))}
    </List>
  );
}
