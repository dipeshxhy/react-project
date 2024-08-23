import React, { useContext} from "react";
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";

const Nav = () => {
  const [products] = useContext(ProductContext);
  let distinct_Category =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_Category = [...new Set(distinct_Category)];

  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()},${(
      Math.random() * 255
    ).toFixed()},${(Math.random() * 255).toFixed()},0.4)`;
  };
  

  return (
    <nav className="w-[15%] h-screen bg-zinc-100 flex flex-col items-center pt-md">
      <a
        href="/create"
        className=" py-sm  px-md border-none rounded border-blue-500 text-blue-300"
      >
        add new product
      </a>
      <hr className="w-[80%] my-sm " />
      <h1 className="text-2xl w-[80%] font-extralight text-red-300 ">
        category
      </h1>
      <div className="w-[80%] ">
        {distinct_Category.map((d) => (
          <Link
          
            to={`/?category=${d}`}
            key={d.id}
            className=" mb-sm  flex items-center "
          >
            {" "}
            <span style={{backgroundColor:color()}} className="w-[15px] h-[15px] mr-xxs rounded-full "></span>
            {d}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
