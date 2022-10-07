import { Link } from "react-router-dom";

const Item = ({id, title, description, price, pictureUrl}) => {

  pictureUrl = (pictureUrl) ? pictureUrl : '@public/images/no_product_image.png';

  return(
    <div className="col-3 p-2">
      <div className="h-100 card">
        <img src={pictureUrl } className="card-img-top" alt={title}/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p>{price}</p>
          <Link className="btn btn-danger" to={`/item/${id}`}>Detalle</Link>
        </div>
      </div>
    </div>
  );
}

export default Item;