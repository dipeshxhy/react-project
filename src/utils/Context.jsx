
import axios from './axios'
import React, { createContext, useEffect, useState } from 'react'
export const ProductContext=createContext()

const Context = (props) => {
    const [products, setproducts] = useState(JSON.parse(localStorage.getItem("products")) ||null)
    // const getProducts=async()=>{
    //     try {
    //         const {data}= await axios.get("/products")
    //         setproducts(data)
    //         // console.log(data)

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // useEffect(()=>{
    //     getProducts()
    // },[])
  return (<ProductContext.Provider value={[products, setproducts]}>
 { props.children}
 </ProductContext.Provider>
  )
}

export default Context