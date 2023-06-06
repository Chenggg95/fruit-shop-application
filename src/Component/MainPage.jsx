import React from 'react';
import { useNavigate } from 'react-router';
import "../App.css"

const MainPage = () => {
    const navigate = useNavigate();

    const handleClick = (event) =>{
        if(event.target.id === "checkout"){
            navigate("/checkout");
        }
        if(event.target.id === "checkstock"){
            navigate("/checkstock")
        }
    }
    return(
        <>
            <h3>What will you like to do?</h3>
            <div className="main-buttons">
                <button id="checkout" onClick={handleClick}>Check Out</button>
                <button id="checkstock" onClick={handleClick}>Check Stock</button>
            </div>
        </>
    )
}

export default MainPage;