import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SkillsIcon from "../Assets/svg/SkillsIcon";

export default function SkillForm(props) {
  const { skills } = props;
  return (
    <div>
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
    </div>
  );
}
