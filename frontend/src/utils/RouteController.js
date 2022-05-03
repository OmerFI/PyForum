import React, { Component } from "react";
import PrivateRoute from "./PrivateRoute";
import Header from "../components/Header";
import Footer from "../components/Footer";

class RouteController extends Component {
  static defaultProps = {
    isPrivateRoute: false,
    privateRouteRedirect: "/",
    header: Header,
    footer: Footer,
    includeHeader: true,
    includeFooter: true,
  };

  render() {
    const {
      isPrivateRoute,
      privateRouteRedirect,
      children,
      header,
      footer,
      includeHeader,
      includeFooter,
    } = this.props;

    return (
      <>
        {includeHeader && header()}
        {isPrivateRoute ? (
          <PrivateRoute redirect={privateRouteRedirect}>
            {children}
          </PrivateRoute>
        ) : (
          children
        )}
        {includeFooter && footer()}
      </>
    );
  }
}

export default RouteController;
