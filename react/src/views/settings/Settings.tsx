import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import LoginInput from './LoginInput'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#F8F9FA'
  },
}));


export default function ScrapingMain() {
  const classes = useStyles()

  return (
    <Grid
      container
      justify="center"
      alignItems="flex-start"
      className={classes.root}
    >
      <Grid
        container
        item
        xs={10}
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        <LoginInput />
      </Grid>
    </Grid>
  );
}
