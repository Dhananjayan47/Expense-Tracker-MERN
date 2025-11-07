// import axios from 'axios';
import API from "../services/api.js";
import "./SignUpPage.css";
import PopUp from "../components/PopUp.jsx"
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const LoginPage = () => {
    const [userDetails, setUserDetails] = useState({ email: "", password: "" });
    const navigate = useNavigate();
     const [isSubmitted, setIsSubmitted] = useState(false);
    const [isPopUp, setIsPopUp] = useState(false);
    const notification=useRef();

    useEffect(()=>{
        const show= setTimeout(() => {
            notification.current=''
            setIsPopUp(false)
        }, 3000);
        return ()=>clearTimeout(show);
    },[isPopUp])

    const handleChange = (e) => {
        setUserDetails((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(userDetails.email==''||userDetails.password==''){
            notification.current='Please fill all Fields';
            setIsPopUp(true);
            return;
        }

        try {
            setIsSubmitted(true);
            const response = await API.post('api/user/Login', userDetails);
            console.log(response.data);
            localStorage.setItem("loginEmail",userDetails.email)
            navigate("/verify");
        } catch (err) {
            console.error("error :", err.response?.data||err.message);
            notification.current=err.response?.data.message;
            setIsPopUp(true);
            setIsSubmitted(false); 
        }
    };

    return (
        <>
            <section className="SignUp-con">
                {isPopUp&&<PopUp value={notification}/> }
                <form className="SignUp-form" onSubmit={handleSubmit}>
                    <h2>Login Page</h2>
                    <div>
                        <label htmlFor="email">Enter Your Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={userDetails.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="pass">Enter Your Password</label>
                        <input
                            type="password"
                            name="password"
                            id="pass"
                            value={userDetails.password}
                            onChange={handleChange}
                        />
                    </div>
                    {isSubmitted==false?<input type="submit" value="Submit" />:<p>Loading</p>}
                    <Link to={'/'}>New User ?</Link>
                </form>
            </section>
        </>
    );
};

export default LoginPage;
