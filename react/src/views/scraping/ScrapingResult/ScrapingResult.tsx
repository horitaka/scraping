import React from 'react';

// import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import BaseLayout from '../BaseLayout'
import ScrapingResultTable from '../ScrapingResultTable'

// const useStyles = makeStyles(theme => ({
//   button: {
//     '& > *': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
// }));

export default function ScrapingResult(props) {
  const { saveData } = props

  const handleSaveButtonClick = () => {
    saveData()
  }

  const itemComponent = (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      spacing={2}
    >
      <Grid container item xs={12} justify="flex-end">
        <Grid container item xs={4} justify="center">
          <Button variant="contained" fullWidth color="primary" onClick={handleSaveButtonClick}>
            <Typography>保存</Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid container item xs={12} justify="center">
        <ScrapingResultTable />
      </Grid>
    </Grid>
  )

  return (
    <Grid item xs={12}>
      <BaseLayout title="結果" itemComponent={itemComponent} />
    </Grid>
  );
}
