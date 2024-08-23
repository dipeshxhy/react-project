import React, {  useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./Loading";
import { ProductContext } from "../utils/Context";
import { toast } from "react-toastify";

const Detail = () => {
  const{id}=  useParams()
  const [products, setproducts] = useContext(ProductContext);
 const navigate= useNavigate()

  const [product, setproduct] = useState(null)
    // const getSingleProduct=async()=>{
    //     try {
    //        const {data}=await axios.get(`/products/${id}`)
    //        setproduct(data)
    //     } catch (error) {
    //        console.log(error) 
    //     }
    // }
    useEffect(()=>{
      if(!product){
setproduct(products.filter(p=>p.id==id)[0])
      }
        // getSingleProduct()
    })
    const productDeleteHandler=(id)=>{
      const filteredProduct=products.filter(p=>p.id!=id)
      setproducts(filteredProduct)
      localStorage.setItem("products",JSON.stringify(filteredProduct))
      navigate('/')
      toast.success("data deleted successfully")
    }
  return (product?
    <div className="w-[80%] h-full m-auto py-[10%] px-[15%] flex  items-center ">
   
  

      <div className="img w-[80%] h-[60%] ">
        <img
          className="w-full h-full object-contain  "
          src={`${product.image}`}
          alt=""
        />
      </div>
      <div className="content  ml-xl w-full flex flex-col gap-xs  ">
        <h1 className="text-2xl leading-none font-medium">
         {product.title}
        </h1>
        <h2 className="text-xl text-gray-500">{product.category}</h2>
        <h3 className="text-sm text-green-600">$ {product.price}</h3>
        <p className="text-xs text-gray-400 leading-none font-normal ">
         {product.description}
        </p>
        <div className="mt-lg ">
          <Link to={`/edit/${product.id}`} className=" py-sm mr-sm  px-lg border rounded border-blue-800 text-blue-300">
            Edit
          </Link>
          <button onClick={()=>productDeleteHandler(product.id)} className=" py-sm  px-lg border rounded border-red-800 text-blue-300">
            Delete
          </button>
        </div>
      </div>
       
           
        
    </div>
    :<Loading/>
  );
};

export default Detail;
