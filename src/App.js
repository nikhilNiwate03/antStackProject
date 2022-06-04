import React, { useState } from 'react'
import './App.css';
import Dashboard from './components/DashBoard/Dashboard';
import Header from './components/Header/Header';
const data = require('./converter/data.json')


function App() {
  const [orderData,setOrderData]=useState();
  console.log(orderData)
  return (
    <div className='main'>
      <Header data={data} setOrderData={setOrderData}/>
      {orderData ? (
        <Dashboard data={orderData} />
      ):(
        <Dashboard data={data} />
      )}
    </div>
  );
}

export default App;
