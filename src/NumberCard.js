import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider, makeStyles } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 12,
    minWidth: 256,
    textAlign: 'center',
    margin:'7px'
  },
  header: {
    textAlign: 'center',
    spacing: 10,
  }
}));

export default (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} width="400px">
      <CardHeader title={props.label} className={classes.header} />
      <Divider variant="middle" />
      <CardContent>
        <Typography variant="h4" align="center">
          {props.totalCases}
        </Typography>
      </CardContent>
    </Card>
  );
};
