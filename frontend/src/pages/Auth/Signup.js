import React, { useState } from "react";
import { auth, db, createUserWithEmailAndPassword, signInWithPopup, sendEmailVerification, googleProvider, doc, setDoc, collection, query, where, getDocs, runTransaction } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa"; // Import Google Icon
import "../../styles/Signup.css"; // Import styles

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        referralCode: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const { email, password, firstName, lastName, referralCode } = formData;

            // Create Firebase User
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            let user = userCredential.user;

            // Refresh Authentication Token Before Firestore Write
            await user.reload(); // Ensures Firebase updates the user session
            user = auth.currentUser; // Get the updated user object
            await user.getIdToken(true); // Forces token refresh

            if (!user || !user.uid) {
                console.log("Firebase user is NULL. Cannot write to Firestore.");
                return;
            }

            let extraPoints = 0;

            // Check Referral Code and Reward Extra Points
            if (referralCode) {

                const q = query(collection(db, "users"), where("referralCode", "==", referralCode));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {

                    // Reward new user 100 points
                    extraPoints = 100;

                    // Get referrer's UID
                    const referrerUID = querySnapshot.docs[0].id;
                    const referrerDocRef = doc(db, "users", referrerUID);

                    // Use Firestore Transaction to Update Referrer's Points
                    await runTransaction(db, async (transaction) => {
                        const referrerDoc = await transaction.get(referrerDocRef);

                        if (!referrerDoc.exists()) {
                            throw new Error("Referrer does not exist!");
                        }

                        const newPoints = (referrerDoc.data().points || 0) + 100;
                        transaction.update(referrerDocRef, { points: newPoints });
                    });

                } else {
                    console.log("Invalid referral code provided.");
                }
            }

            // Store New User in Firestore
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, {
                firstName,
                lastName,
                email,
                points: 100 + extraPoints, // Base 100 points + referral bonus
                referralCode: Math.random().toString(36).substring(2, 8), // Generate unique referral code
                role: "end-user",
            });

            // Send Email Verification
            await sendEmailVerification(user);

            // Redirect to login page with success message
            navigate("/login", { state: { message: "Signup successful! Please verify your email before logging in." } });

        } catch (error) {
            console.error("Signup Failed:", error);
            setError(error.message);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                points: 100,
                referralCode: user.uid.substring(0, 6)
            }, { merge: true });

            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="signup-container">
            {/* Signup Content Wrapper */}
            <div className="signup-content">
                {/* Left Section */}
                <div className="signup-left">
                    <img src="/logo.png" alt="Property Smart Logo" className="signup-logo" />
                    <div className="signup-info">
                        <h3>Free Sign-Up</h3>
                        <ul>
                            <li>Get 100 points on your first sign-up!</li>
                            <li>Use points for price predictions, Custom ML models, and more.</li>
                        </ul>
                    </div>
                </div>

                {/* Right Section */}
                <div className="signup-right">
                    <div className="signup-box">
                        {/* Header with log in link */}
                        <div className="signup-header">
                            <h2>Create an account</h2>
                            <a href="/login" className="login-link">log in instead</a>
                        </div>

                        {error && <p className="error-message">{error}</p>}
                        <form onSubmit={handleSignup}>
                            <input type="text" name="firstName" placeholder="First name" required onChange={handleChange} />
                            <input type="text" name="lastName" placeholder="Last name" required onChange={handleChange} />
                            <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                            <input type="password" name="password" placeholder="Password" required onChange={handleChange} />

                            {/* Referral Code Input */}
                            <input type="text" name="referralCode" placeholder="Referral Code (Optional)" onChange={handleChange} />

                            {/* Terms Checkbox */}
                            <div className="terms-container">
                                <input type="checkbox" required id="terms" />
                                <label htmlFor="terms">
                                    By creating an account, I agree to our
                                    <a href="/terms-of-use"> Terms of use </a> and
                                    <a href="/privacy-policy"> Privacy Policy</a>.
                                </label>
                            </div>

                            <button type="submit" className="signup-button">Create an account</button>
                        </form>

                        {/* OR Separator */}
                        <div className="separator">
                            <hr />
                            <span>OR</span>
                            <hr />
                        </div>

                        {/* Google Sign-In Button */}
                        <button onClick={handleGoogleSignup} className="google-button">
                            <FaGoogle className="google-icon" />
                            Continue with Google
                        </button>
                    </div>
                </div>
            </div>

            {/* Statistics Section - Moved Below the Signup */}
            <div className="stats-section">
                <div className="stats-container">
                    <div className="stat-box">
                        <h2 className="stat-number">98%</h2>
                        <p className="stat-text">Prediction Accuracy</p>
                    </div>
                    <div className="stat-box">
                        <h2 className="stat-number">50K+</h2>
                        <p className="stat-text">Properties Analyzed</p>
                    </div>
                    <div className="stat-box">
                        <h2 className="stat-number">24/7</h2>
                        <p className="stat-text">Real-time Updates</p>
                    </div>
                    <div className="stat-box">
                        <h2 className="stat-number">100+</h2>
                        <p className="stat-text">Data Points</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Signup;
