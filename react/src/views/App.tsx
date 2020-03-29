import React from 'react';
import styled from 'styled-components'

import TwoPaneLayout from './TwoPaneLayouts'
import Settings from './settings/Settings'
import ScrapingMain from './scraping/ScrapingMain'

const App = () => {
  return (
    <TwoPaneLayout
      leftComponent={<Settings />}
      rightComponent={<ScrapingMain />}
    />
  );
}

export default App;
