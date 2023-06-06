import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../App.css";

const CheckStock = () => {
    const navigate = useNavigate();
    const [fruitStock, setFruitStock] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/getstock')
            .then((response) => response.data)
            .then((data) => setFruitStock(data))
            .catch(error => console.log(error));
    },[fruitStock]);
    
    const handleClick =(event) => {
        if(event.target.id === "mainPage"){
            navigate("/");
        }
        if(event.target.id === "updateStock"){
            navigate("/updatestock", {state:{fruitStock}});
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
                        <td id="quantity">{fruitItem.quantity}</td>
                    </tr>     
                ))}
            </tbody>

        </table>
        
        <div className="okay-button">
            <button id="updateStock" onClick={handleClick}>Update Stock</button>
            <button id="mainPage" onClick={handleClick}>Back to Main Page</button>
        </div>
    </>
  )
}

export default CheckStock;
