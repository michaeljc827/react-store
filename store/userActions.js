
const token = localStorage.getItem('userToken')

export const userInitialState = {
    user: {
        loggedIn: (token != null),
        token: token
    }
};

export const userActions = {
    login: (state, args) => {
        const token = args.token
        localStorage.setItem("userToken", token);
        return {
            user: {
                loggedIn: true,
                token: token
            }
        };
    },
    logout: state => {
        return { user: { loggedIn: false } };
    }
};