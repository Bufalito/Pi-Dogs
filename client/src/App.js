import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

//////////COMPONENTS//////////
import LandingPage from './components/landingPage/LandingPage';
import Home from './components/home/Home';


function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>

  );
}

export default App;


//npm uninstall react-router-dom
//npm install react-router-dom@5.0.0