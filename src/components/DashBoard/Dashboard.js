import React, { useState } from 'react'
import './Dashboard.css'

const Dashboard = (props) => {
    const {data}=props
    const [sort,setSort]=useState(false);
    const [sortData,setSortData]=useState();
    const handleSort=()=>{
        setSort(true);
    }
    let sortArr;
    if(sort){
        sortArr=[...data]
        sortArr.sort((a,b)=>parseInt(a.deliveryPincode) - parseInt(b.deliveryPincode))
    }
    else{
        sortArr=[...data]
    }

  return (
    <table className='table table-hover'>
        <thead className='thead-dark'>
            <tr>
                <th>Order ID</th>
                <th>Customer ID</th>
                <th>
                    <a
                    className='pin-sort'
                    onClick={()=>setSort(!sort)}
                    >
                    PinCode 
                    <span style={{fontSize: "20px"}}> &#8593;&darr;</span>
                    </a>
                </th>
                <th>Order Date</th>
                <th>Items</th>
            </tr>
        </thead>
        <tbody>
            {sortArr.map((val)=>{
                return(
                    <tr key={val.orderId}>
                        <td>{val.orderId}</td>
                        <td>{val.customerId}</td>
                        <td>{val.deliveryPincode}</td>
                        <td>{val.orderDate}</td>
                        <td>{Object.keys(val.items).map((item,index)=>(
                            <li key={index}>{`${item} - ${val.items[item]}`}</li>
                        ))}</td>
                    </tr>
                )
            })}           
        </tbody>
    </table>
  )
}

export default Dashboard