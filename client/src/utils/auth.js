class Auth {
    static isAuthenticated() {
        return localStorage.getItem("jwt-token") !== null;
    }
}

export default Auth;
