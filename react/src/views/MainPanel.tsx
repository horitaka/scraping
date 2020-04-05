import React from 'react';
import { Switch, Route } from "react-router-dom";

import ScrapingMain from './scraping/ScrapingMain'
import Settings from './settings/Settings'

const MainPanel = () => {
  return (
    <Switch>
      <Route path="/settings">
        <Settings />
      </Route>
      <Route path="/">
        <ScrapingMain />
      </Route>
    </Switch>
  );
}

export default MainPanel
