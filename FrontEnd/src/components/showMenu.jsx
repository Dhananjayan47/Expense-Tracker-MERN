import React from "react";
import './FrontPage.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';
const ShowMenu = ({close,showDialog,profile}) => {
// const [openProfile, setOpenProfile] = useState(true);
const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="menu">
                <div className="exit-btn">
                    <FaTimes onClick={() => close(false)} />
                    <div>
                        <p>PROFILE</p>
                        <RiArrowDropDownLine className="drop-down" onClick={()=>setIsOpen(prev=>!prev)}/>
                    </div>
                </div>
                {isOpen&&<div>
                    <p>user :{profile.name}</p>
                </div>}
               
                <div className="menu-list">
                    <button>
                        <Link to={"/dashboard"}>HOME</Link>
                    </button>
                    <button>
                        <Link to={"/about"}>ABOUT</Link>
                    </button>
                    <button onClick={()=>showDialog(true)}>
                        LOGOUT
                    </button>
                </div>
            </div>
        </>
    );
}
 
export default ShowMenu;