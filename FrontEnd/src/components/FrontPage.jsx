import { LuSquareMenu } from "react-icons/lu";
import { useState } from "react";
import "./FrontPage.css";
import MainPage from "./MainPage";
import ShowMenu from "./showMenu";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const FrontPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [dialogBox, setDialogBox] = useState(false);
    const [profile,setProfile] = useState(null);
    const navigate = useNavigate();

   
    const openMenu=async()=>{
        try {
            const response=await API.get('/api/user/Profile');
            setProfile(response.data);
            setIsMenuOpen(true);
        } catch (error) {
            console.error('failed to get profile:',error)
        }


    }
    const handleLogout=async()=>{
        try {
        await API.post('/api/user/Logout');
        navigate('/login')
    } catch (error) {
        console.error('error message :',error)
        }
    }
    return (
        <div className="total-con">
            <header>
                <div className="top-header-con">
                    <h2>Expense Tracker</h2>
                    <button className="show-menu" >
                        <LuSquareMenu className="menu-bar" onClick={openMenu}/>
                    </button>
                </div>
            </header>
            <main>
                <MainPage/>
                {
                    isMenuOpen&&<ShowMenu close={setIsMenuOpen} showDialog={setDialogBox} profile={profile}/>
                }
                {
                    dialogBox&&(<div className="confirm-con">
                        <div className="dialog-box">
                          <p>Are you sure you want to logout?</p>
                          <div className="dialog-actions">
                            <button onClick={handleLogout}>Yes</button>
                            <button onClick={()=>setDialogBox(false)}>Cancel</button>
                          </div>
                        </div>
                      </div>)
                }
            </main>
            <footer>copy-rights</footer>
        </div>
    );
};

export default FrontPage;
