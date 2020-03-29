import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  }
});

function TwoPaneLayout(props) {
  const classes = useStyles();

  return (
    <Grid
      direction="row"
      alignItems="stretch"
      container
      className={classes.root}
    >
      <Grid
        xs={2}
        item
        container
        className={classes.root}
      >
        {props.leftComponent}
      </Grid>
      <Grid
        xs={10}
        item
        container
      >
        {props.rightComponent}
      </Grid>
    </Grid>

  )
}

export default TwoPaneLayout
