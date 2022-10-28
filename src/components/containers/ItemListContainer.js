import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getItemsByCategory } from "../../util/Firebase";

import ItemList from "../presentation/ItemList";


const ItemListContainer = ({rootPath}) => {

  const {id} = useParams();

  const [items, setItems] = useState('');
  
  useEffect(()=>{
    setItems('');

    getItemsByCategory(id).then(items => {
      let itemsCol = items.docs.map(item => {
        let itemData = item.data();
        itemData.pictureUrl = (itemData.pictureUrl) ? `${rootPath}/assets/images/${itemData.pictureUrl}` : '';
        return ({ id: item.id, ...itemData });
      });

      setItems(itemsCol);
    });

  }, [id]);

  if(items === ''){
    return(
      <div className="col-10 offset-1 d-flex justify-content-center align-items-center" style={{minHeight: '100vh'}}>
        <div className="spinner-border text-dark me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h3>Cargando items...</h3>
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