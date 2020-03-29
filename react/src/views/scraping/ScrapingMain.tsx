import React from 'react';

import Grid from '@material-ui/core/Grid';

import UrlInput from './UrlInput'
import ScrapingExecution from './ScrapingExecution'
import ScrapingResult from './ScrapingResult'

export default function ScrapingMain() {
  return (
    <Grid
      container
      justify="center"
    >
      <Grid
        container
        item
        xs={10}
      >
        <UrlInput />
        <ScrapingExecution />
        <ScrapingResult />
      </Grid>
    </Grid>
  );
}
