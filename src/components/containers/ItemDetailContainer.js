import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

import { getItem } from "../../util/Firebase";

import ItemDetail from "../presentation/ItemDetail";

const ItemDetailContainer = () => {

  const {id} = useParams();
  const [item, setItem] = useState([]);

  useEffect(()=>{

    getItem(id)
      .then(item => {
        if(item.exists()){
          let itemData = item.data();
          itemData.pictureUrl = `../assets/images/${itemData.pictureUrl}`;
          
          setItem(({ id: item.id, ...itemData, exist: true}));
        }else{
          setItem(({ exist: false }));
        }
      });

  }, []);

  if(item.length == 0){
    return(
      <div className="col-10 offset-1 d-flex justify-content-center align-items-center" style={{minHeight: '100vh'}}>
        <div className="spinner-border text-dark me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h3>Cargando item...</h3>
      </div>
    );
  }

  return(
    <div className="col-10 offset-1">
      <ItemDetail id={item.id} title={item.title} description={item.description} price={item.price} pictureUrl={item.pictureUrl} stock={item.stock} variants={item.variants} exist={item.exist} />
    </div>
  );
}

export default ItemDetailContainer;