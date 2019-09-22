import { loginQuery } from '../../queries/mutation';

export const authLogin = async (client, email, password) => {
	try {
		const { data } = await client.mutate({
			mutation: loginQuery,
			variables: {
				email: email,
				password: password
			}
		});

		if (data.login.token) {
			return data.login.token;
		}
		return false;
	} catch (error) {
		alert(
			error.message === 'GraphQL error: Invalid Username/Password.'
				? 'Invalid login credentials.'
				: error.message === 'GraphQL error: No Such User Found'
					? 'Invalid login credentials.'
					: 'Error communicating with server.' + error
		);
	}
};
