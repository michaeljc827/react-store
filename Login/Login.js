import React, { useCallback, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';

import { useStore } from '../../../store/useStore';
import { authLogin } from '../../Auth/Auth';

import logo from '../../../images/common/logo.png';
import './Login.scss';

const Login = (props) => {
	/*Set State for user.loggedIn and login dispatch*/
	const { state, dispatch } = useStore();

	const login = useCallback((token) => dispatch({ type: 'login', args: { token: token } }), [dispatch]);

	/*Create refs for inputs*/
	const usernameInput = useRef(null);
	const passwordInput = useRef(null);

	const handleLogin = async (client) => {
		const email = usernameInput.current.value;
		const password = passwordInput.current.value;
		const token = await authLogin(client, email, password);
		if (token) {
			login(token);
		}
	};

	if (state.user.loggedIn === true) {
		return <Redirect to="/" />;
	}

	const listenForEnterKey = (event, client) => {
		if (event.key === 'Enter') {
			handleLogin(client);
		}
	};

	return (
		<ApolloConsumer>
			{(apolloClient) => {
				return (
					<div className="login-container">
						<div className="row">
							<img src={logo} alt="VoltronCRM" />
						</div>
						<div className="login-box row">
							<div className="col-sm-12">
								<h4 style={{ marginTop: 20, textAlign: 'center' }}>Log in to Voltron</h4>
							</div>
							<div className="col-sm-12">
								<form className="login-form">
									<input
										ref={usernameInput}
										type="text"
										autoComplete="current-username"
										className="uk-input"
										onKeyDown={(event) => {
											listenForEnterKey(event, apolloClient);
										}}
									/>
									<input
										ref={passwordInput}
										type="password"
										autoComplete="current-password"
										className="uk-input"
										onKeyDown={(event) => {
											listenForEnterKey(event, apolloClient);
										}}
									/>
									<button
										type="button"
										onClick={() => {
											handleLogin(apolloClient);
										}}
										className="btn btn-primary"
									>
										Login
									</button>
								</form>
							</div>
						</div>
					</div>
				);
			}}
		</ApolloConsumer>
	);
};

export default Login;
