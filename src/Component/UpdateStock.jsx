import axios from 'axios';
import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "../App.css"

const UpdateStock = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {fruitStock} = location.state;
    const [stock, setStock] = useState(fruitStock);

    const handleQuantityChange = (event, index) => {
        const updatedStock = [...stock];
        updatedStock[index].quantity = event.target.value;
        setStock(updatedStock);
    }

    const handleClick = (event) => {
        if(event.target.id === "cancel"){
            navigate("/");
        }
        if(event.target.id === "update"){
            const update = stock.map((fruitItem) => ({
                fruit: fruitItem.fruit,
                quantity: parseInt(fruitItem.quantity)
            }))
            console.log(update);
            axios.put('http://localhost:3001/updatestock', {update})
                .then(response => response.data)
                .then(data => navigate("/"))
                .catch(error => console.error(error));
        }
        
    }
  return (
    <>
    <table>
        <tbody>
            <tr>
                <td>Fruit</td>
                <td>Quantity</td>
            </tr>
                {fruitStock.map((fruitItem, index) => (
                    <tr key={index}>
                        <td id="fruit">{fruitItem.fruit}</td>
                        <td><input type="number" id="quantity" value={fruitItem.quantity} onChange={(event) => handleQuantityChange(event, index)}></input></td>
                    </tr>     
                ))}
        </tbody>
    </table>
    <div className="main-buttons">
        <button id="update" onClick={handleClick}>Update</button>
        <button id="cancel" onClick={handleClick}>Cancel</button>
    </div>
    </>
  )
}

export default UpdateStock;

