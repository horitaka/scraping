import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import BaseLayout from '../BaseLayout'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 120,
  },
  textField: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(2),
    // minWidth: 120,
  },
}));


export default function UrlInput(props) {
  const { listPageUrls, setListPageUrls } = props
  const classes = useStyles();
  // const labels = ['URL1を入力', 'URL2を入力', 'URL3を入力']
  const labels = ['URLを入力']

  const handleUrlChange = (event, index) => {
    const newListPageUrls = listPageUrls.slice()
    newListPageUrls[index] = event.target.value
    setListPageUrls(newListPageUrls)
  }

  const baseInput = (
    <TextField label="URL入力" />
  )

  const itemComponent = (
    <FormControl fullWidth>
    {
      labels.map((label, index) => {
        return (
          <TextField
            key={index}
            label={label}
            value={listPageUrls[index] || ''}
            fullWidth
            className={classes.textField}
            onChange={(event) => handleUrlChange(event, index)}
          />
        )
      })
    }
    </FormControl>
  )

  return (
    <Grid item xs={12}>
      <BaseLayout title="URL" itemComponent={itemComponent} />
    </Grid>
  );
}
