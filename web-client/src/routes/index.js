import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import AuthRoute from "./AuthRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute path="/" exact={true} component={Dashboard} />
        <Route path="/auth/:page" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}
