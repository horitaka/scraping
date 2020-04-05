import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import BaseCardLayout from '../../common/BaseCardLayout'

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


export default function LoginInput(props) {
  const { listPageUrls, setListPageUrls } = props
  const classes = useStyles();
  const labels = ['ログイン用URL', 'ユーザーID', 'パスワード']

  const handleUrlChange = (event, index) => {
    const newListPageUrls = listPageUrls.slice()
    newListPageUrls[index] = event.target.value
    setListPageUrls(newListPageUrls)
  }

  const itemComponent = (
    <FormControl fullWidth>
    {
      labels.map((label, index) => {
        return (
          <TextField
            key={index}
            label={label}
            value={listPageUrls}
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
      <BaseCardLayout title="ログイン情報" itemComponent={itemComponent} />
    </Grid>
  );
}
