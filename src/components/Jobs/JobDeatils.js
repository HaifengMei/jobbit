import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Collapse,
  IconButton,
  Chip,
  Tooltip
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

import moment from "moment";
import QuestSvgIcon from "../BottomNav/QuestSvgIcon";
import RewardsSvgIcon from "../../assets/svg/RewardsSvgIcon";
import LocationSvgIcon from "../../assets/svg/LocationSvgIcon";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import PublishIcon from "@material-ui/icons/Public";
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

export default function JobDetails(props) {
  const classes = useStyles();
  const { job, deleteJob, updateJob } = props;
  const bull = <span className={classes.bullet}>•</span>;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const truncate = (n, text) => {
    return text.length > n ? text.substr(0, n - 1) + "..." : text;
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Tooltip title="Status">
          <Chip
            label={job.status}
            color={
              job.status == "Listed"
                ? "primary"
                : job.status == "Unlisted"
                ? "secondary"
                : "default"
            }
            size="small"
            className={classes.status}
          />
        </Tooltip>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Last Updated: {moment(job.timestamp._seconds).format("LL")}
        </Typography>
        <Typography variant="h5" component="h2">
          {job.name}
        </Typography>
        <Tooltip title="Reward and Location">
          <Typography className={classes.pos} color="textSecondary">
            <RewardsSvgIcon fontSize={"small"} /> {job.reward} {job.currency}{" "}
            {bull} <LocationSvgIcon fontSize={"small"} />{" "}
            {moment(job.date).format("LL")}
          </Typography>
        </Tooltip>

        <Typography variant="body2" component="p">
          {truncate(50, job.description)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Edit">
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
        {job.status !== "Listed" ? (
          <Tooltip title="List on Job Board">
            <IconButton onClick={() => updateJob(job.id, { status: "Listed" })}>
              <PublishIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Unlist from Job Board">
            <IconButton
              color="primary"
              onClick={() => updateJob(job.id, { status: "Unlisted" })}
            >
              <PublishIcon />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title="Delete">
          <IconButton color="secondary" onClick={() => deleteJob(job.id)}>
            <DeleteForeverIcon />
          </IconButton>
        </Tooltip>
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
          <Typography variant="overline">Full Description:</Typography>
          <Typography variant="body2" paragraph>
            {job.description}
          </Typography>
          <Typography variant="overline">Location:</Typography>
          <Typography variant="body2" paragraph>
            {job.location}
          </Typography>
          <Typography variant="overline">Date:</Typography>
          <Typography variant="body2">
            {moment(job.date).format("LLLL")}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
