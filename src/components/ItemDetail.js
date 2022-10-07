import React from "react";

const ItemDetail = ({id, title, description, price, pictureUrl}) => {

  pictureUrl = (pictureUrl) ? pictureUrl : 'images/no_product_image.png';

  return(
    <div className="p-5 col-10 offset-1 d-flex flex-column justify-content-evenly bg-dark bg-opacity-50 text-white">
      <h3 className="mb-3">{title}</h3>
      <div className="d-flex justify-content-between">
        <img style={{backgroundColor: "white"}} src={pictureUrl} width="40%" alt={title}/>
        <p>{description}</p>
      </div>
      <p className="py-3">Pecio: {price}</p>
    </div>
  );
}

export default ItemDetail;