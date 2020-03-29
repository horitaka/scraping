import React from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import TwoPaneLayout from './TwoPaneLayouts'
import Settings from './settings/Settings'
import ScrapingMain from './scraping/ScrapingMain'

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
    <ThemeProvider theme={theme}>
      <TwoPaneLayout
        leftComponent={<Settings />}
        rightComponent={<ScrapingMain />}
      />
    </ThemeProvider>
  );
}

export default App;
