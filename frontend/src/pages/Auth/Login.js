import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithPopup, googleProvider } from "../../firebaseConfig";
import "../../styles/Login.css";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const location = useLocation(); // Get message from navigation state
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // Store login success message
    const signupSuccessMessage = location.state?.message || ""; // Capture signup success message

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage(""); // Clear previous messages

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!user.emailVerified) {
                setError("Please verify your email before logging in.");
                return;
            }

            setSuccessMessage("Login successful!!!!!"); // Show success message
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            setSuccessMessage("Login successful! Redirecting..."); // Show success message
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                {/* Show signup success message if redirected from Signup */}
                {signupSuccessMessage && (
                    <div className="alert alert-success" role="alert">
                        {signupSuccessMessage}
                    </div>
                )}

                {/* Show login success message */}
                {successMessage && (
                    <div className="alert alert-success" role="alert">
                        {successMessage}
                    </div>
                )}

                <h2>Login to Property Smart</h2>

                {/* Show error messages for login failures */}
                {error && <div className="alert alert-danger">{error}</div>}

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