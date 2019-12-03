import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Input
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SkillsIcon from "../../assets/svg/SkillsIcon";
import AddIcon from "@material-ui/icons/Add";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  root: {
    marginLeft: "-20px"
  },
  text: {
    wordWrap: "break-word"
  }
});

function SkillsForm(props) {
  const {
    skills,
    addSkill,
    newSkill,
    setNewSkill,
    removeSkill,
    classes
  } = props;

  return (
    <List desnse="true" className={classes.root}>
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
              multiline
            />
          }
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="add"
            onClick={addSkill}
            disabled={newSkill == ""}
            color="primary"
          >
            <AddIcon  />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      {skills.map((skill, idx) => (
        <ListItem key={skill.id}>
          <ListItemIcon>
            <SkillsIcon />
          </ListItemIcon>
          <ListItemText primary={skill.value} className={classes.text} />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => removeSkill(idx)}
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}

export default withStyles(styles)(SkillsForm);
