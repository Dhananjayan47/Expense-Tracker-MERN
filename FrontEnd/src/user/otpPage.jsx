import React, { useRef } from "react";
import { useState, useEffect } from "react";
import "./SignUpPage.css";
import API from "../services/api";
import PopUp from "../components/PopUp";
import { useNavigate,Link } from "react-router-dom";
const OtpPage = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [isPopUp, setIsPopUp] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const email = localStorage.getItem("loginEmail");
    const notification = useRef("");

    useEffect(() => {
        const show = setTimeout(() => {
            notification.current = "";
            setIsPopUp(false);
        }, 3000);
        return () => clearTimeout(show);
    }, [isPopUp]);
    const handleChange = (e) => {
        setOtp(e.target.value);
    };
    const submitOtp = async (e) => {
        e.preventDefault();
        if (otp=='') {
            notification.current='Enter Valid OTP'
            setIsPopUp(true);
            return;
        }
        try {
            setIsSubmitted(true);
            const response = await API.post(
                "api/user/VerifyOtp",
                { email, otp },
                { withCredentials: true }
            );
            console.log(response.data.message);
            localStorage.removeItem("loginEmail");
            setOtp("");
            navigate("/dashboard");
        } catch (err) {
            console.error("OTP error:", err.response?.data || err.message);
            notification.current = err.response?.data.message;
            // console.log(notification);
            setIsPopUp(true);
        }
    };

    return (
        <>
            <section className="otp-con">
                {isPopUp && <PopUp value={notification} />}
                <form className="otp-form" onSubmit={submitOtp}>
                    <div>
                        <h2>Verify Page</h2>
                        <div className="upper-con">
                            <label htmlFor="email">Enter Your OTP</label>
                            <input
                                type="number"
                                name="email"
                                id="email"
                                minLength="1"
                                maxLength="4"
                                // min='1'
                                // max='4'
                                value={otp}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="lower-con">
                            {!isSubmitted && (
                                <input type="submit" value="submit" />
                            )}
                        </div>
                        <Link to='/login'>Login Page</Link>
                    </div>
                </form>
            </section>
        </>
    );
};

export default OtpPage;
