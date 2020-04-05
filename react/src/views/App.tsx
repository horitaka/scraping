import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import TwoPaneLayout from './TwoPaneLayouts'
import MainPanel from './MainPanel'
import NavigationPanel from './navigation/NavigationPanel'

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#FF9800',
      // dark: will be calculated from palette.primary.main,
      contrastText: '#fafafa'
    },
    secondary: {
      // light: will be calculated from palette.primary.main,
      main: '#29B6F6',
      // dark: will be calculated from palette.secondary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
      contrastText: '#ffffff'
    },
  },
});

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <TwoPaneLayout
          leftComponent={<NavigationPanel />}
          rightComponent={<MainPanel />}
        />
      </ThemeProvider>
    </Router>
  );
}

export default App;
