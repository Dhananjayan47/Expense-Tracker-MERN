// import AddForm from "./AddForm";
import { Link } from "react-router-dom";
import "./MainPage.css";
import { useEffect, useState } from "react";
import ShowData from "./showData";
import API from '../services/api'
// import axios from "axios";
const MainPage = () => {
    const [items, setItems] = useState([]);
    const [incomeAmount, setIncomeAmount] = useState();
    const [expenseAmount, setExpenseAmount] = useState();
    const [totalAmount, setTotalAmount] = useState(0);
    const [dataFetch, setDataFetch] = useState(false);
    const [activeBtn, setActiveBtn] = useState('Today');
    // const [addForm, setAddForm] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if(activeBtn==='Today'){
                    response = await API.get('/api/expense/todayLists')
                 }else if(activeBtn==='This Week'){
                    response= await API.get('/api/expense/thisWeekLists')
                 }else if(activeBtn==='This Month'){
                     response= await API.get('/api/expense/thisMonthLists')
                 }else {
                    // Optionally handle unexpected activeBtn values
                    console.warn('Unexpected activeBtn:', activeBtn);
                    return;
                }
                
                const fetchedItems=response.data;
                 setItems(fetchedItems);


                 if (!fetchedItems || fetchedItems.length === 0) {
                     console.warn("No items to send for INCOME total calculation.");
                     setIncomeAmount('0')
                     setExpenseAmount('0')
                    return;
                }
                console.log(fetchedItems);
               
                const totalIncome = await API.post('/api/expense/total/income', fetchedItems);
                setIncomeAmount(totalIncome.data);
                const totalExpense = await API.post('/api/expense/total/expense', fetchedItems);
                setExpenseAmount(totalExpense.data);
               
            } catch (err) {
                // console.error("error fetching data", err);
                
                    console.error("❌ Backend error:", err.response.status, err.response.data);
            }
        };
        
            fetchData(); // only fetch when flag is true
        
    }, []);

    // useEffect(()=>{
    //     const fetchData=async()=>{
    //         try {
    //             // Ensure `items` is not empty or undefined before posting
    //             if (!items || items.length === 0) {
    //                 console.warn("No items to send for INCOME total calculation.");
    //                 return;
    //             }
    //             const response = await API.post("/api/expense/total/INCOME", items);
    //             console.log("INCOME total response:", response.data);
    //             setIncomeAmount(response.data);
    //         } catch (error) {
    //             console.error("Error fetching INCOME total:", error);
    //         }
    //     };
    //     fetchData()
    // },[activeBtn])
    useEffect(() => {
        const freshData = async () => {
            try {
               
               
                let response;
                if(activeBtn==='Today'){
                    response = await API.get('/api/expense/todayLists')
                 }else if(activeBtn==='This Week'){
                    response= await API.get('/api/expense/thisWeekLists')
                 }else if(activeBtn==='This Month'){
                     response= await API.get('/api/expense/thisMonthLists')
                 }else {
                    // Optionally handle unexpected activeBtn values
                    console.warn('Unexpected activeBtn:', activeBtn);
                    return;
                }
                
                const fetchedItems=response.data;
                 setItems(fetchedItems);


                 if (!fetchedItems || fetchedItems.length === 0) {
                    console.warn("No items to send for INCOME total calculation.");
                    setIncomeAmount('0');
                    setExpenseAmount('0');
                    setDataFetch(false)
                    return;
                }
                console.log(fetchedItems);
               
                const totalIncome = await API.post('/api/expense/total/income', fetchedItems);
                setIncomeAmount(totalIncome.data);
                const totalExpense = await API.post('/api/expense/total/expense', fetchedItems);
                setExpenseAmount(totalExpense.data);
               setDataFetch(false)
            
            } catch (err) {
                console.error("error fetching data", err);
            }
        };
        if (dataFetch) {
            freshData(); // only fetch when flag is true
        }
    }, [dataFetch]);
   useEffect(() => {
        const total = incomeAmount - expenseAmount;
        setTotalAmount(Number(total));
    }, [incomeAmount, expenseAmount]);


    const handleUpdate=async(updatedItem)=>{
        console.log(updatedItem);
        
        setDataFetch(true);
        await API.post('/api/expense/updateItem',updatedItem)
    }
    const handleDelete=async(deletedItem)=>{
        try {
            await API.post('/api/expense/deleteItem', deletedItem);
            setDataFetch(true);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }
    // const handleAdd=()=>{
    //     setAddForm((prev)=>!prev);
    // }
    const handleFilter =async(label)=>{
        setActiveBtn(label);

        let response;
        try {
            if(label==='Today'){
               response = await API.get('/api/expense/todayLists')
            }else if(label==='This Week'){
               response= await API.get('/api/expense/thisWeekLists')
            }else if(label==='This Month'){
                response= await API.get('/api/expense/thisMonthLists')
            }
            setItems(response.data);
            setDataFetch(true);
            // setIncomeAmount(5000)
        } catch (error) {
            console.error('Error fetching data :',error)
        }
    }
    return (
        <>
            <section className="date-container">
                <button className={activeBtn=='Today'?'active-btn':''} onClick={()=>handleFilter('Today')}>Today</button>
                <button className={activeBtn=='This Week'?'active-btn':''} onClick={()=>handleFilter('This Week')}>This Week</button>
                <button className={activeBtn=='This Month'?'active-btn':''} onClick={()=>handleFilter('This Month')}>This Month</button>
            </section>
            <section className="info-container">
                <div>
                    <div className="info-div">
                        <p>INCOME</p>
                        <p>{isNaN(incomeAmount) ? "0" : incomeAmount}</p>
                    </div>
                </div>
                <div>
                    <div className="info-div">
                        <p>EXPENSE</p>
                        <p>{isNaN(expenseAmount) ? "0" : expenseAmount}</p>
                    </div>
                </div>
                <div>
                    <div className="info-div">
                        <p>TOTAL</p>
                        <p>{isNaN(totalAmount) ? "0" : totalAmount}</p>
                    </div>
                </div>
            </section>
            <section className="saved-info">
                {items.map((item) => (
                    <ShowData key={item._id} item={item} onEdit={handleUpdate} onDelete={handleDelete}/>
                ))}
            </section>
            <section className="add-btn">
                <Link to="/addForm">
                    <button>+</button>
                </Link>
            </section>
        </>
    );
};

export default MainPage;
