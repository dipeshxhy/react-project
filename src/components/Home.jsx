import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/axios";

const Home = () => {
    const [products]=useContext(ProductContext)
  const [filteredproduct, setfilteredproduct] = useState(null)
  const {search}=useLocation()
  const category= decodeURIComponent (search.split("=")[1])
  console.log(category);
  const getCategory=async()=>{
    try {
        const{data}=await axios.get(`/products/category/${category}`)
        setfilteredproduct(data)

    } catch (error) {
        console.log(error);
        
    }
  }
  
  useEffect(()=>{
    if(!filteredproduct || category==="undefined" ) setfilteredproduct(products)
    if(category!="undefined") {
      // getCategory()
      setfilteredproduct(products.filter(p=>p.category==category))
    }
  },[category,products])
    
  return (products?
    <>
    <Nav />
    <div className="h-full  p-sm flex w-[85%]  flex-wrap mr-sm mb-sm overflow-x-hidden pt-xl overflow-y-auto ">
       {
     filteredproduct &&  filteredproduct.map(p=>(
      <Link    key={p.id}  to={`/details/${p.id}`} className="card  w-[20%] h-[45vh] border shadow p-md rounded-lg  mb-sm ml-sm    ">
        <div
          className="w-full hover:scale-110  h-[60%] bg-contain bg-center bg-no-repeat  "
          style={{
            backgroundImage:
              `url(${p.image})`,
          }}
        ></div>
        <h3 className="text-xs mt-sm hover:text-blue-500 ">
         {p.title}
        </h3>
      </Link >

        ))
       }
      
       

         
    </div>
    </>:<Loading/>
  );
};

export default Home;
