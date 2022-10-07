import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {

  const {id} = useParams();
  const [item, setItem] = useState([]);

  useEffect(()=>{

    // API D&D

    fetch('../products/products.json')
      .then(res => res.json())
      .then(equipments => {
        let equipment = equipments.find(e => e.id == id);
        equipment.pictureUrl = `../images/${equipment.pictureUrl}`;
        setTimeout(()=>{setItem(equipment)}, 2000);
      })

  }, []);

  if(item.length == 0){
    return(
      <div className="col-10 offset-1 d-flex justify-content-center">
        <h3>Cargando...</h3>
      </div>
    );
  }

  return(
    <div className="col-10 offset-1">
      <ItemDetail id={item.id} title={item.title} description={item.description} price={item.price} pictureUrl={item.pictureUrl} />
    </div>
  );
}

export default ItemDetailContainer;