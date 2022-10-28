import Item from "./Item";


const ItemList = ({items}) => {
  if(!items.length){
    return(
      <div className="col-10 offset-1 d-flex justify-content-center">
        <h3>No se encontro ningun item, lo siento!</h3>
      </div>
    )
  }

  return(
    <div className="d-flex flex-wrap justify-content-center">
      {items.map((item)=><Item key={item.id} id={item.id} title={item.title} price={item.price} pictureUrl={item.pictureUrl} stock={item.stock} />)}
    </div>
  );
}

export default ItemList;