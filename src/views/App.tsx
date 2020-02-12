import React from 'react';
import styled from 'styled-components'

import Scraper from './Scraper'

const App = () => {
  return (
    <AppContainer>
      <Scraper />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

export default App;
