import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
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
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);


  useEffect(() => {
    (async() => {
      const user = await dispatch(authenticate());
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, [dispatch]);


  if (!loaded) {
    return null;
  }



  return (
    <div>
      <BrowserRouter style={{ display: 'flex', flexDirection: 'column'}}>
      <NavBar setAuthenticated={setAuthenticated} sessionUser={sessionUser} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <ProtectedRoute
            path="/users/:userId"
            exact={true}
            authenticated={authenticated}
          >
            <User />
          </ProtectedRoute>
          <ProtectedRoute
            path="/users/profile/:userId"
            exact={true}
            authenticated={authenticated}
          >
            <UserProfile sessionUser={sessionUser} />
          </ProtectedRoute>
          <ProtectedRoute
            path="/map"
            exact={true}
            authenticated={authenticated}
          >
            <Map />
          </ProtectedRoute>
          <ProtectedRoute
            path="/aircrafts/:craft_id"
            exact={true}
            authenticated={authenticated}
          >
            <ServiceShow />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
