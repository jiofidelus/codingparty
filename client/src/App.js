/** @format */

import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import NavBar from './components/Nvarbar';
import Suggestions from './components/Suggestions';
import Technologies from './components/Technologies';

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Switch>
        <Route path='/technologies' component={Technologies} />
        <Route path='/suggestions' component={Suggestions} />
        <Route path='/' component={Home} />
      </Switch>
    </>
  );
}

export default App;
