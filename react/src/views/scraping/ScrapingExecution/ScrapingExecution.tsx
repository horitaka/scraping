import React from 'react';

// import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import BaseLayout from '../BaseLayout'

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '90%',
//     margin: 'auto'
//   },
// }));

export default function ScrapingExecution(props) {
  const { runScraping } = props
  // const classes = useStyles();

  const handleStartButtonClick = () => {
    runScraping()
  }

  const handleStopButtonClick = () => {

  }

  const itemComponent = (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      spacing={3}
    >
      <Grid container item xs justify="center">
        <Button variant="contained" fullWidth color="primary" onClick={handleStartButtonClick}>
          <Typography>開始</Typography>
        </Button>
      </Grid>
      <Grid container item xs justify="center">
        <Button variant="contained" fullWidth color="primary" onClick={handleStopButtonClick}>
          <Typography>一時停止</Typography>
        </Button>
      </Grid>
    </Grid>
  )

  return (
    <Grid item xs={12}>
      <BaseLayout title="スクレイピング" itemComponent={itemComponent} />
    </Grid>
  );
}
