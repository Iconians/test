import React from "react";
import { Carving } from "../../interfaces";
import { ProductHolder } from "../ProductHolder/ProductHolder";
import "./ProductComponentHolder.css";

interface props {
  h3: string;
  array: Carving[];
}

export const ProductComponentHolder = ({ h3, array }: props) => {
  return (
    <div className="component-holder-wrapper">
      <div className="h3-wrapper">
        <h3>{h3}</h3>
      </div>
      <div className="product-holder-container">
        {array.map((carving) => (
          <ProductHolder
            name={carving.carvingName}
            img={carving.image}
            id={carving.id}
            key={carving.id}
          />
        ))}
      </div>
    </div>
  );
};
