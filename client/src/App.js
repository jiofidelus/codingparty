/** @format */

import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import NavBar from './components/Navbar';
import Suggestions from './components/Suggestions';
import Technologies from './components/Technologies';

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <div>
        <Switch>
          <Route path='/technologies' component={Technologies} />
          <Route path='/suggestions' component={Suggestions} />
          <Route path='/' component={Home} />
        </Switch>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
