import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-boost';

import PrivateRoute from './components/Auth/PrivateRoute';
import { StoreProvider, useStore } from './store/useStore';

/*Pages*/
import Dashboard from './components/Page/Dashboard/Dashboard';
import Clients from './components/Page/Clients/Clients';
import Projects from './components/Page/Projects/Projects';
import Login from './components/Page/Login/Login';
import Logout from './components/Auth/Logout';

import Header from './components/Common/Header/Header';
import Client from './components/Page/Client/Client';
import UpdateProspect from './components/Page/UpdateProspect/UpdateProspect';
import CompletePendingClient from './components/Page/CompletePendingClient/CompletePendingClient';
import Prospects from './components/Page/Prospects/Prospects';

const httpLink = createHttpLink({
	// uri: 'http://localhost:4000/graphql/dev/data' //always works
	// uri: 'http://192.168.1.121:4000/dev/data' // home
	uri: 'http://192.168.11.35:4000/graphql/dev/data' //office
});

function App() {
	return (
		<StoreProvider>
			<ApolloWrapper>
				<Router>
					<Header />
					<Route path="/login" component={Login} />
					<PrivateRoute exact path="/" component={Dashboard} />
					<PrivateRoute exact path="/clients" component={Clients} />
					<PrivateRoute exact path="/projects" component={Projects} />
					<PrivateRoute exact path="/client/:id" component={Client} />
					<PrivateRoute exact path="/update-prospect/:id" component={UpdateProspect} />
					<PrivateRoute exact path="/complete-pending-client/:id" component={CompletePendingClient} />
					<PrivateRoute exact path="/prospects" component={Prospects} />
					<Route exact path="/logout" component={Logout} />
				</Router>
			</ApolloWrapper>
		</StoreProvider>
	);
}

/*Create wrapper to have token stored in state. Token is passed into authLink incase of log out and log back in as different
user */
const ApolloWrapper = ({ component: Component, children, ...rest }) => {
	const { state } = useStore();

	const authLink = setContext((_, { headers }) => {
		// get the authentication token from local storage if it exists
		const token = state.user.token;
		// return the headers to the context so httpLink can read them
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : ''
			}
		};
	});

	const errorLink = onError(({ graphQLErrors }) => {
		if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
	});

	const client = new ApolloClient({
		link: ApolloLink.from([errorLink, authLink, httpLink]),
		cache: new InMemoryCache()
	});

	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default App;
