import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Contexts from "../../context/Contexts";
import { addItemToWishList, removeItemOfWishList } from "../../util/Firebase";

import ItemCount from "./ItemCount";

const ItemDetail = ({id, title, description, price, pictureUrl, stock, variants, exist}) => {

  const cartCtx = useContext(Contexts.cartContext);
  const userCtx = useContext(Contexts.userContext);
  const navigate = useNavigate();

  pictureUrl = (pictureUrl) ? pictureUrl : 'images/no_product_image.png';

  const isInWishList = userCtx.user?.wishlist.includes(id);

  const handleWishlist = () => {
    if(userCtx.user?.wishlist.includes(id)){
      removeItemOfWishList(userCtx.user.user_id, id);
    }else{
      addItemToWishList(userCtx.user.user_id, id);
    }
  }

  const onAdd = (qtyToAdd) =>{
    let variant = document.getElementById('variants')?.value || '';

    cartCtx.addItem({id, name: title, pictureUrl, price, variant, quantity: qtyToAdd, stock});
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
    <div className="p-5 col-10 offset-1 d-flex flex-column justify-content-evenly bg-dark bg-opacity-75 text-white position-relative">
      { userCtx.user && (isInWishList ? (
        <i className="fa-solid fa-heart position-absolute top-0 end-0 mt-2 me-2 text-danger" style={{fontSize: '1.5rem'}} onClick={handleWishlist}></i>
        ) : (
        <i className="fa-regular fa-heart position-absolute top-0 end-0 mt-2 me-2" style={{fontSize: '1.5rem'}} onClick={handleWishlist}></i>
      ))}
      <h3 className="mb-3">{title}</h3>
      <div className="d-flex justify-content-between">
        <img style={{backgroundColor: "white", maxWidth: '40%'}} src={pictureUrl} alt={title} className="me-3"/>
        <div className="d-flex flex-column justify-content-between">
          <p>{description}</p>
          
          <div className="d-flex justify-content-between">
            <p>Pecio: {`${price.quantity} ${price.unit}`}</p>
            <p>Disponibles: {stock} unidades</p>
          </div>

          {variants && (
            <div className="col-6">
              <select className="form-select" id='variants' aria-label="Default select example">
                {variants.map(variant => <option key={variant} value={variant}>{variant}</option>)}
              </select>
            </div>
          )}

          <ItemCount stock={stock} onAdd={onAdd}/>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;