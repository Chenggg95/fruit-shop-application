import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import "../App.css"

const Checkout = () => {
    const navigate = useNavigate();
    const [fruitList, setFruitList] = useState([]);

    const addItem = (event) => {
        event.preventDefault();
        const newFruit = {
        fruit: event.target.elements.fruit.value,
        quantity: event.target.elements.quantity.value
        };
        setFruitList((prevFruitList) => [...prevFruitList, newFruit]);
        event.target.reset();
    };

    const checkout = () => {
        navigate("/savetransaction", {state: {fruitList}});
    }

    return (
        <>
        <form onSubmit={addItem}>
            <table>
                <tbody>
                    <tr>
                        <td>Fruit:</td>
                        <td><input type="text" id="fruit" name="fruit"/></td>
                        <td>Quantity:</td>
                        <td><input type="number" id="quantity" name="quantity"/></td>
                        <td><button type="submit">Add Item</button></td>
                    </tr>
                </tbody>
            </table>
        </form>
        <div className="checkout"><button type="button" onClick={checkout}>Checkout</button></div>
        <h2>Items added</h2>
        <ul className="fruit-details">
            {fruitList.map((fruit, index) => (
                <li key={index}>
                    Fruit: {fruit.fruit}, Quantity: {fruit.quantity}
                </li>
            ))}
        </ul>
        
        </>
    );
}

export default Checkout;