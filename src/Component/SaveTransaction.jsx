import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import priceList from './PriceList';

const SaveTransaction = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {fruitList} = location.state;
    const [total, setTotal] = useState(0);

    useEffect(() => {
      let calculatedTotal = 0;
      for(let i = 0; i < fruitList.length; i++){
        const fruitItem = fruitList[i];
        const quantity = fruitItem.quantity;
        const weight = fruitItem.weight;
        const price = priceList[fruitItem.fruit];
        calculatedTotal += price * quantity * weight;
      }
      setTotal(calculatedTotal);
    }, [fruitList]
    );

    const handleClick = (event) => {
      if(event.target.id === "yes"){
        const getStockPromise = new Promise((resolve, reject) => {
          axios.get('http://localhost:3001/getstock')
            .then((response) => resolve(response.data))
            .catch(error => reject(error));
        })

        const saveTransactionPromise = new Promise((resolve, reject) => {
          const transaction = {
            fruitList: fruitList,
            total: total
          }
  
          axios.post('http://localhost:3001/savetransaction',{transaction})
          .then((response) => resolve(response.data))
          .catch(error => reject(error));
        })
        
        getStockPromise.then((data) => {
          const updatedStock = data.map((fruitItem) => {
            const match = fruitList.find((fruit) => fruit.fruit === fruitItem.fruit);
            if(match){
              return {
                fruit: fruitItem.fruit,
                quantity: fruitItem.quantity - match.quantity
              }
            }
            return fruitItem;
          });
          return updatedStock;
          })
          .then((updatedStock) => {
            axios.put('http://localhost:3001/updatestock', {update: updatedStock})
            .then((response) => response.data)
            .then((data) => console.log("done"))
            .catch(error => console.error(error));
          })
          
          .then(() => saveTransactionPromise)
          .then((data) => {
            console.log(data);
            navigate("/saved");
          })
    
        
      }
      else if (event.target.id === "no"){
        navigate("/");
      }
    }
    
  return (
    <>
      <h2>The calculated total price is ${total.toFixed(2)}.</h2>
      <h2>Do you want to save the transaction?</h2>\
      <div className="main-buttons">
        <button type = "button" id="yes" onClick={handleClick}>yes</button>
        <button type = "button" id="no" onClick={handleClick}>no</button>
      </div>
      
    </>
  )
}

export default SaveTransaction;
