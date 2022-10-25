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
      <div className="col-10 offset-1 d-flex justify-content-center">
        <h3>Cargando item...</h3>
      </div>
    );
  }

  return(
    <div className="col-10 offset-1">
      <ItemDetail id={item.id} title={item.title} description={item.description} price={item.price} pictureUrl={item.pictureUrl} stock={item.stock} exist={item.exist} />
    </div>
  );
}

export default ItemDetailContainer;