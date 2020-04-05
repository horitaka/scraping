import React from 'react';
import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.secondary.light,
  },
}));

// function ListItemLink(props) {
//   return <ListItem button component="a" {...props} />;
// }


function NavigationPanel(props) {
  const classes = useStyles();

  const handleScrapingLinkClick = () => {
    props.history.push('/')
  }

  const handleSettingsLinkClick = () => {
    props.history.push('/settings')
  }

  return (
    <Grid className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button onClick={handleScrapingLinkClick}>
          <ListItemIcon>
            <DataUsageIcon />
          </ListItemIcon>
          <ListItemText primary="スクレイピング"/>
        </ListItem>
        <Divider />
        <ListItem button onClick={handleSettingsLinkClick}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="設定" />
        </ListItem>
      </List>

    </Grid>
  );
}

export default withRouter(NavigationPanel)
