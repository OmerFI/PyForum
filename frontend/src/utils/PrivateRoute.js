import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

class PrivateRoute extends Component {
  static contextType = AuthContext;
  static defaultProps = {
    redirect: "/",
  };

  render() {
    const { children, redirect } = this.props;
    let { user } = this.context;

    if (user) {
      return children;
    } else {
      return <Navigate to={redirect} />;
    }
  }
}

export default PrivateRoute;
