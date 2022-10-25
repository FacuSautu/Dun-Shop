import { useNavigate } from "react-router-dom";

const Item = ({id, title, price, pictureUrl}) => {

  pictureUrl = (pictureUrl) ? pictureUrl : 'assets/images/no_product_image.png';

  const navigate = useNavigate();

  return(
    <div className="col-3 p-2">
      <div className="h-100 card">
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