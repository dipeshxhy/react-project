import React, { useContext, useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const [products, setproducts] = useContext(ProductContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    id: nanoid(),
    title: "",
    image: "",
    category: "",
    description: "",
    price: 0,
  });
  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      data.title.trim().length > 5 ||
      data.image.trim().length > 5 ||
      data.category.trim().length > 5 ||
      data.description.trim().length > 5
    ) {
      setproducts([...products, data]);
      localStorage.setItem("products", JSON.stringify([...products, data] ));
    } else {
      alert("Please fill out the form correctly");
    }
    navigate("/");
    toast.success("data created successfully")
  };
  console.log(products);
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
          value={data.title}
        />
        <input
          className="w-full mb-sm outline-none  bg-zinc-200 rounded text-xl"
          type="url"
          name="image"
          placeholder="image link"
          onChange={handleInputChange}
          value={data.image}
        />
        <div className="flex gap-md">
          <input
            className="w-1/2 mb-sm outline-none  bg-zinc-200 rounded text-xl"
            type="text"
            name="category"
            placeholder="category"
            onChange={handleInputChange}
            value={data.category}
          />
          <input
            className="w-1/2 mb-sm outline-none  bg-zinc-200 rounded text-xl"
            type="number"
            name="price"
            placeholder="price"
            onChange={handleInputChange}
            value={data.price}
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
          value={data.description}
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

export default Create;
