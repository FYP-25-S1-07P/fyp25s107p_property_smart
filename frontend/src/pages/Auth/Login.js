import React, { useState } from "react";
import { auth, signInWithEmailAndPassword, signInWithPopup, googleProvider } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";
import { FaGoogle } from "react-icons/fa"; // Google Icon

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!user.emailVerified) {
                setError("Please verify your email before logging in.");
                return;
            }

            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Login to Property Smart</h2>
                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="auth-button">Login</button>
                </form>

                <p className="signup-text">
                    Don't have an account? <a href="/signup">Sign up</a>
                </p>

                <div className="separator">
                    <hr />
                    <span>OR</span>
                    <hr />
                </div>

                <button onClick={handleGoogleLogin} className="google-button">
                    <FaGoogle className="google-icon" /> Continue with Google
                </button>
            </div>
        </div>
    );
};

export default Login;