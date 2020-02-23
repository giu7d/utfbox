import React from "react";
import { Route, Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";

function AuthRoute({ component: Component, AppStore, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        AppStore.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
}

export default inject("AppStore")(observer(AuthRoute));
