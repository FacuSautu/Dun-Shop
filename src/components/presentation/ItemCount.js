import { useState } from 'react';

const ItemCount = ({stock, initial, onAdd, withButton=false, forWishlist=false, onChange}) => {

  const [cant, setCant] = useState(initial || 1);

  const handleCant = (op) => {
    let newCant;
    if (op == 'minus') {
      newCant = (cant-1 <= 0) ? 1 : cant-1;
    }else if (op == 'plus') {
      newCant = (cant+1 >= stock) ? stock : cant+1;
    }else{
      if (op <= 0) {
        newCant = 1;
      }else if(op >= stock){
        newCant = stock;
      }else{
        newCant = op;
      }
    }
    setCant(newCant);
    if(onChange) onChange(newCant);
  }

  const handleOnChange = (e) => {
    const value = parseInt(e.target.value);
    handleCant(value);
  }

  if(withButton){
    return(
      <div className="col-6">
        <div className="input-group">
          <button className="btn btn-danger" type="button" onClick={() => handleCant('minus')}>
            <i className="fa-solid fa-minus"></i>
          </button>
          <input type="text" className="form-control text-center fw-bold" onChange={handleOnChange} value={cant}/>
          <button className="btn btn-danger" type="button" onClick={() => handleCant('plus')}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    );
  }

  return(
    <div className="p-3">
      <div className={(forWishlist ? "d-flex flex-column" : "d-flex")}>
        <div className={(forWishlist ? "col-12" : "col-6")}>
          <div className="input-group">
            <button className="btn btn-danger" type="button" onClick={() => handleCant('minus')}>
              <i className="fa-solid fa-minus"></i>
            </button>
            <input type="text" className="form-control text-center fw-bold" onChange={handleOnChange} value={cant} />
            <button className="btn btn-danger" type="button" onClick={() => handleCant('plus')}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>

        <div className={(forWishlist ? "col-12 d-flex justify-content-center" : "col-6 d-flex justify-content-center")}>
          <button type="button" className="btn btn-danger" onClick={() => onAdd(cant)}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ItemCount;