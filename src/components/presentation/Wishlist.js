import WishlistItem from "./WishlistItem";


const Wishlist = ({items}) => {
  if(!items.length){
    return(
      <div className="col-10 offset-1 d-flex justify-content-center">
        <h3>No tiene ningun item en su Wishlist.</h3>
      </div>
    )
  }

  return(
    <div className="d-flex flex-wrap justify-content-center">
      {items.map((item)=><WishlistItem key={item.id} id={item.id} title={item.title} price={item.price} pictureUrl={item.pictureUrl} stock={item.stock} />)}
    </div>
  );
}

export default Wishlist;