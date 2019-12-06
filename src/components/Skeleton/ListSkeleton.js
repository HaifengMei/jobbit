import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(2)
  },
  media: {
    height: 50
  }
}));

export default function ListSkeleon() {
  const classes = useStyles();

  return (
    <List desnse="true">
      <ListItem>
        <ListItemIcon>
          <Skeleton variant="circle" width={40} height={40} />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />
          }
          secondary={
            <Skeleton height={10} width="40%" style={{ marginBottom: 6 }} />
          }
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Skeleton variant="circle" width={40} height={40} />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />
          }
          secondary={
            <Skeleton height={10} width="40%" style={{ marginBottom: 6 }} />
          }
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Skeleton variant="circle" width={40} height={40} />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />
          }
          secondary={
            <Skeleton height={10} width="40%" style={{ marginBottom: 6 }} />
          }
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Skeleton variant="circle" width={40} height={40} />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />
          }
          secondary={
            <Skeleton height={10} width="40%" style={{ marginBottom: 6 }} />
          }
        />
      </ListItem>
    </List>
  );
}
