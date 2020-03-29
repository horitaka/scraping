import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import UrlInput from './UrlInput'
import ScrapingExecution from './ScrapingExecution'
import ScrapingResult from './ScrapingResult'

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
        <UrlInput />
        <ScrapingExecution />
        <ScrapingResult />
      </Grid>
    </Grid>
  );
}
