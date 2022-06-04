import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import './header.css'
const Header = (props) => {
    const {data,setOrderData}=props
    const [date,setDate]=useState();

    const handleSearch=(e)=>{
        e.preventDefault();
        const pin=document.getElementById('pincode').value;
        const search=document.getElementById('search').value;
        const dateVal=document.getElementById('date').value;
        const date=new Date(dateVal)
        let [day,month,year]=[
            date.getDate(),
            date.getMonth() + 1,
            date.getFullYear()
        ];
        if(day<10){
            day="0"+day
        }
        console.log(day)
        const finalDate=dateVal ? [day,month,year].join('/') : undefined;
        

        if(!finalDate && !pin && !search){
            setOrderData('')
        }

        if(finalDate && pin && search){
            let resultData=data.filter((val)=>val.deliveryPincode===pin && val.orderDate===finalDate)
            if(search && resultData){
                getValBySearch(search,resultData)
            }
        }
        else if(finalDate && pin){
            setOrderData(()=>(
                data.filter((val)=>val.deliveryPincode===pin && val.orderDate===finalDate)
            ))
        }
        else if(finalDate && search){
            let resultData=data.filter((val)=>{
                return val.orderDate===finalDate
            })
            getValBySearch(search,resultData)
        }
        else if(pin && search){
            let resultData=data.filter((val)=>val.deliveryPincode===pin)
            getValBySearch(search,resultData)
        }
        else if(pin){
            setOrderData(()=>(
                data.filter((val)=>val.deliveryPincode===pin)
            ))
        }
        else if(finalDate){
            console.log(finalDate)
            setOrderData(()=>(
                data.filter((val)=>{
                    return val.orderDate===finalDate
                })
            ))
        }
        else if(search){
            let sItems=data.filter((val)=>{
                let result=Object.keys(val.items).filter((item)=>item.toLowerCase()===search.toLowerCase())
                if(result.length>0){
                    return result[0].toLowerCase()===search.toLowerCase()
                }
            })
            console.log(sItems)
            setOrderData(sItems)
        }
        
    }

    const getValBySearch=(searchItem,resultData)=>{
        let sItems=resultData.filter((val)=>{
            let result=Object.keys(val.items).filter((item)=>item.toLowerCase()===searchItem.toLowerCase())
            if(result.length>0){
                return result[0].toLowerCase()===searchItem.toLowerCase()
            }
        })
        setOrderData(sItems)
    }

    const handleRemove=(e)=>{
        e.preventDefault();
        document.getElementById('pincode').value='';
        document.getElementById('search').value='';
        document.getElementById('date').value='';
        setOrderData('')
    }

  return (
    <>
        <form className='form-main'>
            <div className='header_bar'>
                <div className='pincode'>
                    <label >PinCode: {' '}</label>
                    <input
                    id='pincode'
                    className='form-control'
                    ></input>
                </div>
                <div className='search'>
                    <input 
                    id='search'
                    placeholder='Search Items'
                    className='form-control'
                    ></input>
                </div>
                
                <div className='date'>
                    <label>Date: </label>
                    <input 
                    id='date'
                    type="date"
                    className='form-control'
                    ></input>
                </div>
                <a
                onClick={handleSearch}
                className='btn btn-primary mt-2 mb-2 mr-2'
                >Filter Search</a>

                <a
                onClick={handleRemove}
                className='btn btn-primary mt-2 mb-2 mr-2'
                >Remove Filters</a>
            </div>

        </form>
    </>
  )
}

export default Header