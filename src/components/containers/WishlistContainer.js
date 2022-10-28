import { useState, useEffect, useContext } from "react";

import Contexts from "../../context/Contexts";
import { getItemsByWishlist } from "../../util/Firebase";

import Wishlist from "../presentation/Wishlist";

const WishlistContainer = ({rootPath}) => {

  const userCtx = useContext(Contexts.userContext);

  const [items, setItems] = useState('');
  
  useEffect(()=>{
    setItems('');

    getItemsByWishlist(userCtx.user.user_id).then(items => {
      Promise.all(items).then((itemsData) => {
        itemsData = itemsData.map(item => {
          item.pictureUrl = (item.pictureUrl) ? `${rootPath}/assets/images/${item.pictureUrl}` : '';

          return item;
        });
        
        setItems(itemsData);
      })
    });

  }, []);

  if(items === ''){
    return(
      <div className="col-10 offset-1 d-flex justify-content-center">
        <h3>Cargando su Wishlist...</h3>
      </div>
    );
  }

  return(
    <div className="col-10 offset-1">
      <Wishlist items={items} />
    </div>
  );
}

export default WishlistContainer;