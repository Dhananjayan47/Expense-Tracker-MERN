import React from "react";
import "./PopUp.css"
import { useNavigate } from "react-router-dom";
import { AiFillCloseCircle } from 'react-icons/ai';
const About = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="About">
                <div className="About-info">
                    <AiFillCloseCircle className="close-btn" onClick={()=>{navigate('/dashboard')}}/>
                    <h2>Expense Tracker - MERN STack Web Application</h2>
                    <br />
                    <section>
                        <h3>Overview :</h3>
                        <p>
                            Expense Tracker is a full-stack web application
                            developed using the{" "}
                            <b>
                                {" "}
                                MERN Stack — MongoDB, Express.js, React.js, and
                                Node.js{" "}
                            </b>
                            . It is designed to help users efficiently record,
                            categorize, and monitor their financial
                            transactions, giving them valuable insights into
                            their spending and saving patterns.
                        </p>
                    </section>
                    <section>
                        <h3>Core Features:</h3>
                        <h4>1. User Authentication & Security:</h4>
                        <p>
                            The app implements <b>JWT (JSON Web Token)</b>
                            authentication to ensure secure user sessions. Users
                            can register, log in, and manage their personal data
                            safely, with authentication protecting all sensitive
                            routes and operations.
                        </p>
                        <h4>2. Transaction Management:</h4>
                        <p>
                            Users can easily add, update, and delete
                            transactions. Each transaction can be classified as <b>income or expense</b> and assigned to categories
                            like food, movie, transport, or savings, helping
                            users organize and understand their finances better.
                        </p>
                        <h4>3. Data Visualization:</h4>
                        <p>
                            The application provides an intuitive dashboard
                            where users can view summaries and visual reports of
                            their income and expenses, making it easier to
                            identify spending trends and manage budgets
                            effectively.
                        </p>
                        <h4>4. Email Functionality:</h4>
                        <p>
                            Integrated with <b>Nodemailer</b>, the app supports
                            features like <b>password recovery</b>and{" "}
                            <b>email notifications</b>, enhancing user
                            convenience and account security.
                        </p>
                        <h4>5. Frontend & User Experience:</h4>
                        <p>
                            Built using <b>React.js</b>, the frontend offers a
                            responsive and user-friendly interface. It uses
                            <b>React Icons</b>for clean visuals and <b>Axios</b>{" "}
                            for efficient API communication.
                        </p>
                        <h4>6. Backend & API:</h4>
                        <p>
                            The backend, built with <b>Node.js</b> and{" "}
                            <b>Express.js</b>, handles user authentication, CRUD
                            operations for transactions, and manages secure data
                            flow between the frontend and MongoDB database.{" "}
                            <b>CORS</b> and
                            <b>cookie-parser</b> are used to manage cookies and
                            cross-origin requests securely.
                        </p>
                    </section>
                    <section>
                        <h3>Goal of the Project:</h3>
                        <p>
                            The main objective of the Expense Tracker is to
                            provide users with an <b>easy-to-use and secure
                            financial management tool</b>. By helping them record
                            transactions, analyze spending habits, and monitor
                            savings, the app empowers users to make <b>smarter
                            financial decisions</b> and maintain better control over
                            their budgets.
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
}
 
export default About;