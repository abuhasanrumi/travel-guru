import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Error from './Components/Error/Error';
import PlaceDetails from './Components/PlaceDetails/PlaceDetails';
import Login from './Components/Login/Login';
import Hotels from './Components/Hotels/Hotels';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>

      <div className="App">
        
        <Router>
          <Header></Header>

          <Switch>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/hotel">
              <Hotels></Hotels>
            </Route>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/booking/:placeId">
              <PlaceDetails></PlaceDetails>
            </Route>
            <PrivateRoute path="/room/:placeId">
              <Hotels></Hotels>
            </PrivateRoute>
            <Route path="*">
              <Error></Error>
            </Route>
          </Switch>


        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
