import {Route,Routes} from "react-router-dom"
import AddForm from "../components/AddForm";
// import MainPage from "../components/MainPage";
import SignUpPage from "../user/SignUpPage";
import FrontPage from "../components/FrontPage";
import LoginPage from "../user/LoginPage";
import OtpPage from "../user/otpPage";
import NotFoundPage from "../components/404Page"
import About from "../components/About";
// import EditItem from "../components/editItem";
const AppRoutes = () => {
    return ( <Routes>
        <Route path="/addForm" element={<AddForm/>}/>
        <Route path="/dashboard" element={<FrontPage/>}/>
        <Route path="/" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/verify" element={<OtpPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
        <Route path="/about" element={<About/>}/>
        {/* <Route path="/menu" element={<ShowMenu/>}/> */}
        {/* <Route path="/editItem" element={<EditItem/>}/> */}
    </Routes>
     );
}
 
export default AppRoutes;