import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStore } from '../../store/useStore';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { state } = useStore();

    const isLoggedIn = state.user.loggedIn

    return (
        <Route {...rest} render={(props) => (
            isLoggedIn === true
                ? <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute