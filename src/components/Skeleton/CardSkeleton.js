import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(2)
  },
  media: {
    height: 50
  }
}));

export default function CardSkeleton() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Skeleton variant="circle" width={40} height={40} />}
        title={<Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />}
        subheader={<Skeleton height={10} width="40%" />}
      />

      <Skeleton variant="rect" className={classes.media} />

      <CardContent>
        <Skeleton height={10} style={{ marginBottom: 6 }} />
        <Skeleton height={10} width="80%" />
      </CardContent>
    </Card>
  );
}
