import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [products, setproducts] = useContext(ProductContext);
  const [product, setproduct] = useState({
    title: "",
    image: "",
    category: "",
    description: "",
    price: 0,
  });
  const navigate = useNavigate();
  const { id } = useParams();

  //   const [data, setData] = useState({
  //     id: nanoid(),
  //     title: "",
  //     image: "",
  //     category: "",
  //     description: "",
  //     price: 0,
  //   });
  const handleInputChange = (e) => {
    setproduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      product.title.trim().length > 5 ||
      product.image.trim().length > 5 ||
      product.category.trim().length > 5 ||
      product.description.trim().length > 5
    ) {
      const pi = products.findIndex((p) => p.id == id);
      const copyData = [...products];
      copyData[pi] = { ...products, ...product };

      setproducts(copyData);
      localStorage.setItem("products", JSON.stringify(copyData));
      navigate(-1);
    } else {
      alert("Please fill out the form correctly");
      return;
    }
  };
  useEffect(() => {
    setproduct(products.filter((p) => p.id == id)[0]);
  }, [id]);
  console.log(product);
  return (
    <div className="w-full flex flex-col items-center pt-[7%]  ">
      <form
        className=" w-[60%]  shadow-red-400 p-md border-2 rounded-lg  "
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl  w-1/2 mb-xs ">Add New Product</h1>
        <input
          className=" w-full mb-sm mr-sm outline-none  bg-zinc-200 rounded text-xl"
          type="text"
          name="title"
          placeholder="title"
          onChange={handleInputChange}
          value={product.title}
        />
        <input
          className="w-full mb-sm outline-none  bg-zinc-200 rounded text-xl"
          type="url"
          name="image"
          placeholder="image link"
          onChange={handleInputChange}
          value={product.image}
        />
        <div className="flex gap-md">
          <input
            className="w-1/2 mb-sm outline-none  bg-zinc-200 rounded text-xl"
            type="text"
            name="category"
            placeholder="category"
            onChange={handleInputChange}
            value={product.category}
          />
          <input
            className="w-1/2 mb-sm outline-none  bg-zinc-200 rounded text-xl"
            type="number"
            name="price"
            placeholder="price"
            onChange={handleInputChange}
            value={product.price}
          />
        </div>

        <textarea
          className="w-full mb-sm outline-none  bg-zinc-200 rounded text-xl"
          name="description"
          id=""
          rows={3}
          placeholder="add description here...."
          cols={10}
          onChange={handleInputChange}
          value={product.description}
        ></textarea>

        <button
          className="px-md py-xs bg-blue-500 text-white font-semibold rounded-md"
          type="submit"
        >
          {" "}
          Submit
        </button>
      </form>
    </div>
  );
};

export default Edit;
