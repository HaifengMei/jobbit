import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Collapse,
  IconButton,
  CardHeader
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import RecruitsSvgIcon from "../BottomNav/RecruitsSvgIcon";
import SkillList from "../Skills";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    position: "relative"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  status: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: "15px 10px 0 0"
  }
}));

export default function ApplicantDetails(props) {
  const classes = useStyles();
  const { applicant, children } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<RecruitsSvgIcon color="primary" size={"large"} />}
        title={applicant.name}
        subheader={applicant.appliedJob}
      />
      <CardContent>
        <Typography variant="body2" component="p">
          Expand to see skills
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        {children}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <SkillList skills={applicant.skills} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
