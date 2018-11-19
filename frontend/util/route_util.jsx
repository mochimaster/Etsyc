import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect, withRouter, Switch} from 'react-router-dom';


const Auth = ({component: Component, path, loggedIn, exact}) => (
  <Route path={path} exact={exact} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )}/>
);

const Protected = ({component: Component, path, loggedIn, exact}) => (
  <Route path={path} exact={exact} render={(props) => (
    loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/error" />
    )
  )}/>
);

// const EditOnly = ({component: Component, path, loggedIn, exact}) => (
//   <Route path={path} exact={exact} render={(props) => (
//     loggedIn ? (
//       <Component {...props} />
//     ) : (
//       <Redirect to="/login" />
//     )
//   )}/>
// );

// in the state, i can return loggedIn and corectAuthor ?

const mapStateToProps = state => {
  return {loggedIn: Boolean(state.session.id)};
};


export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
