import { useEffect, useState } from "react";
import PopUp from "../components/PopUp.jsx";
// import axios from "axios";
import "./SignUpPage.css"
import API from '../services/api.js'
import { Link,useNavigate } from "react-router-dom";
import { useRef } from "react";
const SignUpPage = () => {
    const [userDetails,setUserDetails]=useState({name:'',email:'',password:''})
    const [isPopUp, setIsPopUp] = useState(false);
    const notification=useRef();
    const navigate=useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleInput=(e)=>{
        setUserDetails(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    
    useEffect(()=>{
        const show = setTimeout(() => {
            notification.current=''
            setIsPopUp(false)
        }, 3000);
        return ()=>clearTimeout(show);
    },[isPopUp])
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(userDetails.name.trim()==''||userDetails.email.trim()==''||userDetails.password.trim()==''){
            
                notification.current='Please Enter All the Fields'
                setIsPopUp(true);
                console.log('here')
            return;
            
        }
        try{
            setIsSubmitted(true);
            const response=await API.post('api/user/SignUp',userDetails)
            console.log('response:',response.data);
            setUserDetails({name:'',email:'',password:''})
            navigate('/Login');
            
        }catch(err){
            console.error("error when sending data :",err.response||err.message)
        }
        console.log(userDetails)
    }
        return (

        <>
            <section className="SignUp-con">
                {isPopUp&&<PopUp value={notification}/>}
                <form className="SignUp-form" onSubmit={handleSubmit}>
                    <h3>Sign-Up Page</h3>
                    
                    <div>
                        <label htmlFor="name">
                            Enter Your Name
                            {/* <input type="text" name="" id="" /> */}
                        </label>
                        <input type="text" value={userDetails.name}name="name" id="name" onChange={handleInput}/>
                    </div>
                    <div>
                        <label htmlFor="email">Enter Your Email</label>
                        <input type="email" name="email"value={userDetails.email} id="email" onChange={handleInput}/>
                    </div>
                    <div>
                        <label htmlFor="password">Enter Your Password</label>
                        <input type="password" name="password"value={userDetails.password} id="password" onChange={handleInput}/>
                    </div>
                    {isSubmitted==false?<input type="submit" value="Submit"/>:<p>Loading...</p>}
                    <Link to='/Login' >Login ?</Link>
                </form>
            </section>
        </>
    );
}
 
export default SignUpPage;