import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from "axios";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();



    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/api/login", {
                username: username,
                password: password
            });

            console.log("login successfuly", response.data);
           setIsAuthenticated(true);
        } catch (error) {
            // Handle login error, e.g., display an error message
            console.error("Login failed", error);
        }
    };

    if (isAuthenticated) {
        navigate('/dashboard')
    }

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <h1>PERPUS</h1>
                    </div>
                    <div className="card-body">
                        

                        <form onSubmit={handleLogin}>
                            <div className="input-group mb-3">
                                <input
                                    type="username"
                                    className="form-control"
                                    placeholder="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
