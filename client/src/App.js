import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

//////////COMPONENTS//////////
import LandingPage from './components/landingPage/LandingPage';
import Home from './components/home/Home';
import DetalleRaza from './components/DetalleRaza/DetalleRaza';
import Formulario from "./components/Formulario/Formulario";



function App() {

  return (

    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path={`/dogs/:id`} component={DetalleRaza} />
        <Route path="/formulario" component={Formulario} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;


//npm uninstall react-router-dom
//npm install react-router-dom@5.0.0