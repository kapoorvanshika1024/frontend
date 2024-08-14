import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "./CardFeature";
import FilterProduct from "./FilterProduct";

const AllProduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);

  // Create a unique list of categories from productData
  const categoryList = [...new Set(productData.map((el) => el.category))];

  // State for filtering products
  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    console.log("Product Data:", productData);
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    console.log("Selected Category:", category);
    const filteredProducts = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    console.log("Filtered Products:", filteredProducts);
    setFilterBy(category);
    setDataFilter(filteredProducts);
  };

  const loadingArrayFeature = new Array(10).fill(null);

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl text-slate-800 mb-4">{heading}</h2>

      <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
        {categoryList.length > 0 ? (
          categoryList.map((el) => (
            <FilterProduct
              category={el}
              key={el}
              isActive={el.toLowerCase() === filterby.toLowerCase()}
              onClick={() => handleFilterProduct(el)}
            />
          ))
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>Loading...</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-4 my-4">
        {dataFilter.length > 0
          ? dataFilter.map((el) => (
              <CardFeature
                key={el._id}
                id={el._id}
                image={el.image}
                name={el.name}
                category={el.category}
                price={el.price}
              />
            ))
          : loadingArrayFeature.map((_, index) => (
              <CardFeature loading="Loading..." key={index + "allProduct"} />
            ))}
      </div>
    </div>
  );
};

export default AllProduct;
