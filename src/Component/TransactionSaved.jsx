import React from 'react'
import { useNavigate } from 'react-router-dom'

const TransactionSaved = () => {

    const navigate = useNavigate();
   
    const handleClick = () => {
        navigate("/")
    }

  return (
    <>
      <h1>Transaction is saved</h1>
      <div className="okay-button"><button className="okay-button" type="button" onClick={handleClick}>Okay</button></div>

    </>
  )
}

export default TransactionSaved;
