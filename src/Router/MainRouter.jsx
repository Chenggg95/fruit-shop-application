import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import MainPage from '../Component/MainPage'
import Checkout from '../Component/Checkout'
import TransactionSaved from '../Component/TransactionSaved'
import SaveTransaction from '../Component/SaveTransaction'
import CheckStock from '../Component/CheckStock'
import UpdateStock from "../Component/UpdateStock"

export default function MainRouter() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<MainPage/>}></Route>
            <Route path="/checkstock" element={<CheckStock/>}></Route>
            <Route path="/checkout" element={<Checkout/>}></Route>
            <Route path="/saved" element={<TransactionSaved/>}></Route>
            <Route path="/savetransaction" element={<SaveTransaction/>}></Route>
            <Route path="/updatestock" element={<UpdateStock/>}></Route>
        </Routes>
    </Router>
  )
}
