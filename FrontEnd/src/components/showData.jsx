import "./PopUp.css";
import { useEffect, useState } from "react";

const ShowData = ({ item, onEdit, onDelete }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editItem, setEditItem] = useState({ ...item });
    const [isPopUp, setIsPopUp] = useState(false);
    useEffect(() => {
        // console.log(editItem);
    }, [editItem]);
    const handleInputChange = (e) => {
        // if(e.target.name=='type'){
        //     return setEditItem((prev)=>({...prev,type:e.target.value,category:''}))
        // }
        setEditItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = () => {
        onEdit(editItem);
        setIsEditing(false);
        setShowDetails(false);
    };

    const incomeCategories = ["Salary", "Reward", "Bonus"];
    const expenseCategories = ["Food", "Travel", "Movie"];

    const renderEditInputField = (key) => {
        if (key == "type") {
            return (
                <select
                    name={key}
                    value={editItem[key]}
                    onChange={handleInputChange}
                >
                    <option value="INCOME">Income</option>
                    <option value="EXPENSE">Expense</option>
                </select>
            );
        } else if (key == "source") {
            return (
                <select
                    name={key}
                    value={editItem[key]}
                    onChange={handleInputChange}
                >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Savings">Savings</option>
                </select>
            );
        } else if (key == "category") {
            const currentType = editItem.type;
            const categoryOption =
                currentType === "INCOME" ? incomeCategories : expenseCategories;
            return (
                <select
                    name={key}
                    value={editItem[key]}
                    onChange={handleInputChange}
                >
                    <option value="">--SELECT--</option>
                    {categoryOption.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            );
        } else if (key == "amount") {
            return (
                <input
                    type="number"
                    name={key}
                    value={editItem[key]}
                    onChange={handleInputChange}
                />
            );
        } else if (key == "description") {
            return (
                <input
                    type="text"
                    name={key}
                    value={editItem[key]}
                    onChange={handleInputChange}
                />
            );
        }
    };

    return (
        <>
            <div className="show-data">
                {showDetails ? (
                    <div className="detail-con">
                        <div className="sh-3">
                            <button onClick={() => setShowDetails(false)}>
                                ↑
                            </button>
                        </div>
                        {isPopUp? (<div className="confirm-con">
                        <div className="dialog-box">
                          <p>Are you sure to delete?</p>
                          <div className="dialog-actions">
                            <button onClick={() => onDelete(item)}>Yes</button>
                            <button onClick={()=>setIsPopUp(false)}>Cancel</button>
                          </div>
                        </div>
                      </div>):(  <> 
                         <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>Key</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    "type",
                                    "source",
                                    "category",
                                    "description",
                                    "amount",
                                ].map((key) => (
                                    <tr key={key}>
                                        <td>
                                            {key.charAt(0).toUpperCase() +
                                                key.slice(1)}
                                        </td>
                                        <td>
                                            {isEditing
                                                ? renderEditInputField(key)
                                                : item[key]}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="tableBtnGroup">
                            {isEditing ? (
                                <>
                                    <button onClick={handleSave}>SAVE</button>
                                    <button onClick={() => setIsEditing(false)}>
                                        CANCEL
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => setIsEditing(true)}>
                                        EDIT
                                    </button>
                                    <button onClick={()=>setIsPopUp(true)}>
                                        DELETE
                                    </button>
                                </>
                            )}
                        </div></>)}
                    </div>
                ) : (
                    <div className="showData">
                        <div className="sh-0">{item.type}</div>
                        <div className="sh-1">-</div>
                        <div className="sh-2">{item.amount}</div>
                        <div className="sh-3">
                            <button onClick={() => setShowDetails(true)}>
                                ↓
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ShowData;
