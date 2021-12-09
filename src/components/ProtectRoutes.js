import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
// import { isAuthenticated } from "utils/helper";

function ProtectedRoute({ component: Component,isLoggedin ,...restOfProps }) {
  
  const token = useSelector(state => state.user.token);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        token!=='' ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;