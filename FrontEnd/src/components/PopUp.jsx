import "./PopUp.css"
// import { useState,useEffect } from "react";
const PopUp = ({value}) => {
 
    return ( <>
<div className="pop-up">
        <p>{value.current}</p>
    </div>
    </> );
}
 
export default PopUp;