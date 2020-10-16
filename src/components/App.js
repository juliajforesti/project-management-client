import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import SignupForm from "../routeComponents/auth/SignupForm";
import Login from "../routeComponents/auth/Login";
import Profile from "../routeComponents/auth/Profile";
import PrivateRoute from "../routeComponents/auth/PrivateRoute";

import ProjectCreate from "../routeComponents/projects/ProjectCreate";
import ProjectList from "../routeComponents/projects/ProjectList";
import ProjectDetail from "../routeComponents/projects/ProjectDetail";
import ProjectEdit from "../routeComponents/projects/ProjectEdit";
import Navbar from "./Navbar";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    const parsedUser = JSON.parse(storedUser || '""');

    setLoggedInUser({ ...parsedUser.user });
  }, []);

  return (
    <div className="container mt-5">
      <BrowserRouter >
      <Navbar user={loggedInUser}/>
        {loggedInUser._id ? (
          <Switch>
            <PrivateRoute
              path="/profile"
              component={Profile}
              user={loggedInUser}
            />
            <Route exact path="/project/all" component={ProjectList} user={loggedInUser} />
            <Route exact path="/project/new" component={ProjectCreate} user={loggedInUser} />
            <Route path="/project/edit/:id" component={ProjectEdit} user={loggedInUser} />
            <Route path="/project/:id" component={ProjectDetail} user={loggedInUser} />
            <Route>
              <Redirect to="/profile" />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/signup" component={SignupForm} />
            <Route
              path="/login"
              render={(props) => {
                return <Login setLoggedInUser={setLoggedInUser} {...props} />;
              }}
            />
            <Route>
              <Redirect to="/login" />
            </Route>
          </Switch>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
