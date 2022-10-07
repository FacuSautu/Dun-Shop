import Swal from 'sweetalert2';
import { useState } from 'react';

const ItemCount = ({item, stock}) => {

  const [cant, setCant] = useState(1);

  const handleCant = (op) => {
    let newCant;
    if (op == 'minus') {
      newCant = (cant-1 <= 0) ? 1 : cant-1;
    }else if (op == 'plus') {
      newCant = (cant+1 >= stock) ? stock : cant+1;
    }
    setCant(newCant);
  }

  const onAdd = () => {
    if(stock > 0){
      Swal.fire({
        icon: 'success',
        text: 'Item agregado al carrito',
        timer: 1500,
        showConfirmButton: false
      });
    }
  }

  return(
    <div className="bg-secondary p-3">
      <h5>{item}</h5>
      <div className="d-flex">
        <div className="col-6">
          <div className="input-group">
            <button className="btn btn-danger" type="button" onClick={() => handleCant('minus')}>
              <i className="fa-solid fa-minus"></i>
            </button>
            <input type="text" className="form-control text-center fw-bold" value={cant}/>
            <button className="btn btn-danger" type="button" onClick={() => handleCant('plus')}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>

        <div className="col-6 d-flex justify-content-center">
          <button type="button" className="btn btn-danger" onClick={() => onAdd()}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ItemCount;