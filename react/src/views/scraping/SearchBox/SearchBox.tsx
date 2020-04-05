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


export default function SearchBox(props) {
  const { searchKeyword, setSearchKeyword } = props
  const classes = useStyles();
  const labels = ['検索キーワードを入力']

  const handleKewwordChange = (event) => {
    setSearchKeyword(event.target.value)
  }

  const itemComponent = (
    <FormControl fullWidth>
    {
      labels.map((label, index) => {
        return (
          <TextField
            key={index}
            label={label}
            value={searchKeyword}
            fullWidth
            className={classes.textField}
            onChange={handleKewwordChange}
          />
        )
      })
    }
    </FormControl>
  )

  return (
    <Grid item xs={12}>
      <BaseLayout title="検索" itemComponent={itemComponent} />
    </Grid>
  );
}
