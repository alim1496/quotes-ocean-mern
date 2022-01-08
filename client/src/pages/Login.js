import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../utils/api";

const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        document.querySelector("#main_navbar").classList.add("d-none");
    }, []);

    const login = (e) => {
        e.preventDefault();
        const { target } = e;
        if (name === "" || password === "") return;
        target.classList.add("loading");
        const data = {
            username: name,
            password,
        };
        setLoading(true);
        setError(false);
        axios
            .post("/api/users/login", data, config)
            .then(({ data: { token, name } }) => {
                localStorage.setItem("jwt-token", token);
                localStorage.setItem("user", name);
                setLoading(false);
                setError(false);
                window.location = "/admin";
            })
            .catch(({response: { data }}) => {
                setLoading(false);
                setError(true);
            });
    };

    return (
        <div className="container grid-xs login-container text-center">
            <h3 className="text-bold">Admin Login</h3>
            <form>
                <div className="form-group">
                    <input
                        className="form-input"
                        type="text"
                        id="username"
                        placeholder="username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        className="form-input"
                        type="password"
                        id="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {loading
                    ? <div className="loading"></div> 
                    : <input type="submit" value="Login" className="btn btn-primary text-bold padded" onClick={login} />}
                {error && <p className="text-error">Does not have admin access</p>}
            </form>
        </div>
    );
};

export default Login;
