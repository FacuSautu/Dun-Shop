import { useContext } from "react";
import { Link } from "react-router-dom";

import cartContext from "../../context/cartContext";

const CartWidget = () => {

  const cartCtx = useContext(cartContext);

  const itemCount = cartCtx.calcItemsQty();

  if(!itemCount){
    return(
      <Link to={'/cart'}>
        <i className="fa-solid fa-lg fa-cart-shopping text-danger position-relative"></i>
      </Link>
    );
  }

  return(
    <Link to={'/cart'}>
      <i className="fa-solid fa-lg fa-cart-shopping text-danger position-relative">
        <span className="badge bg-white text-danger position-absolute bottom-0 start-100 translate-middle rounded-circle" style={{fontSize: '50%'}}>
          {itemCount}
        </span>
      </i>
    </Link>
  );
};

export default CartWidget;
