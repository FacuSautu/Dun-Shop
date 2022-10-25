import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import cartContext from "../../context/cartContext";
import ItemCount from "./ItemCount";

const ItemDetail = ({id, title, description, price, pictureUrl, stock, exist}) => {

  const cartCtx = useContext(cartContext);
  const navigate = useNavigate();

  pictureUrl = (pictureUrl) ? pictureUrl : 'images/no_product_image.png';

  const onAdd = (qtyToAdd) =>{
    cartCtx.addItem({id, name: title, pictureUrl, price, quantity: qtyToAdd, stock});
    Swal.fire({
      icon: 'success',
      text: 'Item agregado al carrito',
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      navigate(-1);
    });
  }

  if(!exist){
    return (
      <div className="p-5 col-10 offset-1 bg-dark bg-opacity-50 text-white text-center">
        <h1>El item que esta buscando no existe, lo sentimos!</h1>
      </div>
    );
  }

  return(
    <div className="p-5 col-10 offset-1 d-flex flex-column justify-content-evenly bg-dark bg-opacity-50 text-white">
      <h3 className="mb-3">{title}</h3>
      <div className="d-flex justify-content-between">
        <img style={{backgroundColor: "white"}} src={pictureUrl} width="40%" alt={title} className="me-3"/>
        <div className="d-flex flex-column justify-content-between">
          <p>{description}</p>
          
          <div className="d-flex justify-content-between">
            <p>Pecio: {`${price.quantity} ${price.unit}`}</p>
            <p>Disponibles: {stock} unidades</p>
          </div>

          <ItemCount stock={stock} onAdd={onAdd}/>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;