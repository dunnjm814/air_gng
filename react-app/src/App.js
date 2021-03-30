import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {useDispatch} from 'react-redux'
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import User from "./components/User";
import Home from './components/HomePage';
import { authenticate } from "./store/session";
import UserProfile from "./components/UserProfile";
import Map from "./components/Map";
import ServiceShow from './components/ServiceShow'

function App() {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => {
      setLoaded(true);
    })
  }, [dispatch]);


  if (!loaded) {
    return null;
  }

  return (
    <div>
      <BrowserRouter style={{ display: 'flex', flexDirection: 'column'}}>
      <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <ProtectedRoute
            path="/users/:userId"
            exact={true}
          >
            <User />
          </ProtectedRoute>
          <ProtectedRoute
            path="/users/profile/:userId"
            exact={true}
          >
            <UserProfile />
          </ProtectedRoute>
          <ProtectedRoute
            path="/map"
            exact={true}
          >
            <Map />
          </ProtectedRoute>
          <ProtectedRoute
            path="/aircrafts/:craft_id"
            exact={true}
          >
            <ServiceShow />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
