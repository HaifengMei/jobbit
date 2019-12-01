import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import { FormControl, InputLabel, Input } from "@material-ui/core";
import SkillsIcon from "../Assets/svg/SkillsIcon";
import AddIcon from "@material-ui/icons/Add";
// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//     maxWidth: 752
//   },
//   demo: {
//     backgroundColor: theme.palette.background.paper
//   },
//   title: {
//     margin: theme.spacing(4, 0, 2)
//   }
// }));

export default function SkillForm(props) {
  //   const classes = useStyles();
  const { skills, addSkill, newSkill, setNewSkill, removeSkill } = props;

  return (
    <div>
      <List desnse="true">
        <ListItem>
          <ListItemIcon>
            <SkillsIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Input
                name={newSkill}
                id="newSkill"
                autoComplete="off"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                placeholder="Add New Skill"
              />
            }
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="add" onClick={addSkill}>
              <AddIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        {skills.map((skill, idx) => (
          <ListItem key={skill.id}>
            <ListItemIcon>
              <SkillsIcon />
            </ListItemIcon>
            <ListItemText primary={skill.value} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeSkill(idx)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
