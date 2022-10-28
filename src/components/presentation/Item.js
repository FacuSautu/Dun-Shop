import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Contexts from "../../context/Contexts";
import { addItemToWishList, removeItemOfWishList } from "../../util/Firebase";

const Item = ({id, title, price, pictureUrl, stock}) => {

  pictureUrl = (pictureUrl) ? pictureUrl : 'assets/images/no_product_image.png';

  const userCtx = useContext(Contexts.userContext);
  const navigate = useNavigate();
  
  const isInWishList = userCtx.user?.wishlist?.includes(id);

  const handleWishlist = () => {
    if(userCtx.user?.wishlist.includes(id)){
      removeItemOfWishList(userCtx.user.user_id, id).then(()=>userCtx.reloadUserLoged());
    }else{
      addItemToWishList(userCtx.user.user_id, id).then(()=>userCtx.reloadUserLoged());
    }
  }

  return(
    <div className="col-3 p-2">
      <div className="h-100 card position-relative">
        {(stock<=0) && (
          <div className="bg-dark opacity-75 text-white rounded d-flex flex-column justify-content-center align-items-center position-absolute top-0 start-0 bottom-0 end-0">
            <h1>Sold out</h1>
            <i className="fa-sharp fa-solid fa-boxes-stacked" style={{fontSize: '4rem'}}></i>
          </div>
        )}
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
        </div>
      </div>
    </div>
  );
}

export default Item;