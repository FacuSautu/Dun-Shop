import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";

const ItemListContainer = ({rootPath}) => {

  const {id} = useParams();

  const [items, setItems] = useState('');
  
  useEffect(()=>{
    setItems('');

    fetch(`${rootPath}products/products.json`)
      .then(res => res.json())
      .then(equipments => {
        equipments = equipments.map(equipment => {
          equipment.pictureUrl = (equipment.pictureUrl) ? `${rootPath}images/${equipment.pictureUrl}` : '';
          return equipment;
        });
        if(id){
          equipments = equipments.filter(equipment => equipment.categories.includes(id));
        }
        setTimeout(() => setItems(equipments), 2000);
      });
  }, [id]);

  if(items === ''){
    return(
      <div className="col-10 offset-1 d-flex justify-content-center">
        <h3>Cargando...</h3>
      </div>
    );
  }

  return(
    <div className="col-10 offset-1">
      <ItemList items={items} />
    </div>
  );
}

export default ItemListContainer;