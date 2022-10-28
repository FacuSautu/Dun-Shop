import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Contexts from "../../context/Contexts";
import { addItemToWishList, removeItemOfWishList } from "../../util/Firebase";

import ItemCount from "./ItemCount";

const WishlistItem = ({id, title, price, pictureUrl, stock}) => {

  pictureUrl = (pictureUrl) ? pictureUrl : 'assets/images/no_product_image.png';

  const cartCtx = useContext(Contexts.cartContext);
  const userCtx = useContext(Contexts.userContext);
  const navigate = useNavigate();

  const isInWishList = userCtx.user?.wishlist.includes(id);

  const handleWishlist = () => {
    if(userCtx.user?.wishlist.includes(id)){
      removeItemOfWishList(userCtx.user.user_id, id);
    }else{
      addItemToWishList(userCtx.user.user_id, id);
    }
  }

  const onAdd = (qtyToAdd) =>{
    cartCtx.addItem({id, name: title, pictureUrl, price, quantity: qtyToAdd, stock});
    Swal.fire({
      icon: 'success',
      text: 'Item agregado al carrito',
      timer: 1500,
      showConfirmButton: false
    });
  }

  return(
    <div className="col-3 p-2">
      <div className="h-100 card position-relative">
        { userCtx.user && (isInWishList ? (
          <i className="fa-solid fa-heart position-absolute top-0 end-0 mt-2 me-2 text-danger" style={{fontSize: '1.5rem'}} onClick={handleWishlist}></i>
          ) : (
          <i className="fa-regular fa-heart position-absolute top-0 end-0 mt-2 me-2" style={{fontSize: '1.5rem'}} onClick={handleWishlist}></i>
        ))}
        <img src={pictureUrl } className="card-img-top" alt={title}/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{`${price.quantity} ${price.unit}`}</p>
          <button className="btn btn-danger" onClick={() => navigate(`/item/${id}`)}>Detalle</button>
          <ItemCount onAdd={onAdd} stock={stock} forWishlist={true} />
        </div>
      </div>
    </div>
  );
}

export default WishlistItem;