import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/Homepage/Homepage.page';
import SignIn from './pages/sign-in/SignIn.page';
import SignUp from './pages/sign-up/SignUp.page';
function App() {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/signup' component={SignUp} />
      <Route exact path='/signin' component={SignIn} />
      <Route rediect='/' />
    </Switch>
  );
}

export default App;
