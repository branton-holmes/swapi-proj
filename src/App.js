import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
// import Person from './Person';
import People from './People';
import Person from './Person';
import { usePerson } from './person.hook';
import { personContext } from './person.context';


function App() {
  const person = usePerson();

  return (
    <personContext.Provider value={person}>
      <Router>
        <Switch>
          <Route path="/people">
            <People />
          </Route>
          <Route path="/person">
            <Person />
          </Route>
        </Switch>
      </Router>
    </personContext.Provider>
  );
}

export default App;
