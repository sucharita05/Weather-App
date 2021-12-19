import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Form from './Components/Form';
import Country from './Components/Country';
import Weather from './Components/Weather';

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/country" component={Country} />
          <Route path="/weather" component={Weather} />
          <Route path="/" component={Form} />
        </Switch>
      </Router>
    </>
  )
}

export default App
