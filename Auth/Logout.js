import React, { useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { useStore } from '../../store/useStore';

const Logout = () => {

    localStorage.removeItem('userToken');
    const { dispatch } = useStore();
    const logout = useCallback((token) => dispatch({ type: 'logout' }), [dispatch]);
    logout();

    return (
        <Redirect to="/login" />
    );
}
export default Logout;