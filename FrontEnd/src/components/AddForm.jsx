import {  useNavigate } from "react-router-dom";
import { useState,useEffect,useRef } from "react";
import { evaluate} from "mathjs"
import API from '../services/api'
import "./AddForm.css"
import PopUp from "./PopUp";
const AddForm = () => {
    const [isIncome, setIsIncome] = useState(true);
    const [valueAccount, setValueAccount] = useState({type:"INCOME", source:"Cash",category:isIncome?"Salary":'Travel',description:"",amount:''});
    const [showValue,setShowValue]=useState("0");
    const [isPopUp,setIsPopUp]=useState(false)

    const errorMsg=useRef('')
    const navigate = useNavigate()
    useEffect(()=>{
        console.log(valueAccount);
        
    },[valueAccount])
    useEffect(()=>{
        const show=setTimeout(() => {
            errorMsg.current="";
           setIsPopUp(false); 
        }, 3000);
        return ()=> clearTimeout(show)
    },[isPopUp])
    useEffect(()=>{
        console.log(typeof(showValue));
        
    },[showValue])
    const handleAccountValue=(e)=>{
        setValueAccount((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    const handleScreenValue=(e)=>{
        const screenValue=e.target.value;
        console.log(showValue[0]);
        
        console.log(typeof(screenValue));
        setShowValue((prev)=>{
            if((showValue[0]=="0")&&(prev.length<=1)){
                return screenValue
            }
            else{
                return prev+screenValue;
            }
        })
    }
    const handleBackspace=()=>{
        
        setShowValue((prev)=>{
            if(prev.length <=1 ) return '0';
            const updated= prev.slice(0,-1);
            return updated === ""?"0":updated;
        });
    };
    const evalValue=()=>{
        const value = showValue;
        try{
            const convertValue=evaluate(value); 
            setShowValue(String(convertValue))

        }catch(err){
            console.error('error evaluate :',err)
        }
    }
    const submitValue=(e)=>{
        const convertValue=evaluate(showValue);
        console.log(convertValue);
        
        setShowValue(String(convertValue))
        setValueAccount(prev=>({...prev,[e.target.name]:convertValue}))
    }

    const handleDetailsSubmit=async(e)=>{
        e.preventDefault()
        if(valueAccount.amount==""){
            errorMsg.current="Press OK Before Save"
            setIsPopUp(true)
            return;
        }
        if(valueAccount.type==""||valueAccount.source==""||valueAccount.category==""||valueAccount.description==""||valueAccount.amount==""){
            errorMsg.current="Please Fill All Field";
            setIsPopUp(true)
            return ;
        }   
        
        try{
            const response = await API.post('/api/expense/submitItem',valueAccount);
            console.log("server response :",response.data);    
            // console.log(valueAccount);
            
            navigate('/dashboard')
            
        }catch(err){
            if (err.response && err.response.status === 429) {
                errorMsg.current="Too many request"
                 setIsPopUp(true)
              }
            console.error("server error :", err)
        }
    }
    
    return (
        <section className="form-style">
            {isPopUp && <PopUp value={errorMsg} />}
            <form onSubmit={handleDetailsSubmit}>
                <div className="decision-container">
                    <div>
                        <input
                            type="button"
                            value="# CANCEL"
                            onClick={() => navigate("/dashboard")}
                        />
                    </div>
                    <div>
                        <input type="submit" value="O SAVE" />
                    </div>
                </div>
                <div className="add-top-container">
                    <div>
                        <label htmlFor="typeOfTransition">
                            <input
                                type="button"
                                id="typeOfTransition"
                                className={
                                    valueAccount.type === "INCOME"
                                        ? "typeOfTransition-select"
                                        : ""
                                }
                                name="type"
                                value="INCOME"
                                onClick={(e) => {
                                    setIsIncome(true);
                                    setValueAccount((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    }));
                                }}
                            />
                            <span>|</span>
                            <input
                                type="button"
                                name="type"
                                id="typeOfTransition"
                                className={
                                    valueAccount.type === "EXPENSE"
                                        ? "typeOfTransition-select"
                                        : ""
                                }
                                value="EXPENSE"
                                onClick={(e) => {
                                    setIsIncome(false);
                                    setValueAccount((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    }));
                                }}
                            />
                        </label>
                    </div>
                </div>

                <div className="form-top-container">
                    <div>
                        <label htmlFor="account">
                            source
                            <select
                                id="account"
                                required
                                name="source"
                                value={valueAccount.source}
                                onChange={handleAccountValue}
                            >{["Cash","Card","Savings"].map(val=>(
                                <option key={val} value={val}>{val.toUpperCase()}</option>
                            ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="category">
                            category
                            <select
                                id="category"
                                name="category"
                                required
                                value={valueAccount.category}
                                onChange={handleAccountValue}
                            >
                                {isIncome ? (
                                    <>{['Salary','Grants','Awards','Refund','Rental','Others'].map((val)=>(
                                        <option key={val} value={val}>{val.toUpperCase()}</option>
                                    ))

                                    }
                                    </>
                                ) : (
                                    <>
                                    {['Travel','Food','Entertainment','Shopping','Health','Recharge','Others'].map((val)=>(
                                        <option key={val} value={val}>{val.toUpperCase()}</option>
                                    ))

                                    }
                                    </>
                                )}
                            </select>
                        </label>
                    </div>
                </div>
                <div className="form-mid-container">
                    <label htmlFor="notes">description</label>
                    <textarea
                        name="description"
                        id="notes"
                        onChange={handleAccountValue}
                        value={valueAccount.description}
                    ></textarea>
                </div>
                <div className="form-bottom-container">
                    <div className="calculator-screen">
                        {/* <p>{showValue}</p> */}
                        <input type="text" name="screenValue"value={showValue}  />
                            <div className="screen-btn">
                                <input
                                    type="button"
                                    value="<"
                                    onClick={handleBackspace}
                                />
                                <input
                                    type="button"
                                    value="="
                                    onClick={evalValue}
                                />
                                <input
                                    type="button"
                                    name="amount"
                                    id="screen"
                                    value="OK"
                                    onClick={submitValue}
                                />
                            </div>
                    </div>
                    <div className="calculator-button">
                    <div className="button-container">
  <div className="row">
    {["1","2","3","+","*"].map((val)=><input type="button" value={val} onClick={handleScreenValue}/>)}
    
  </div>
  <div className="row">
    {["4","5","6","0","/"].map((val)=><input type="button" value={val} onClick={handleScreenValue}/>)}
   
  </div>
  <div className="row">
    {["7","8","9","-","."].map((val)=><input type="button" value={val} onClick={handleScreenValue}/>)}
  </div>
</div>

                    </div>
                </div>
            </form>
        </section>
    );
}
 
export default AddForm;