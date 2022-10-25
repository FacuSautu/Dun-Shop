import { getFirestore, doc, collection, getDoc, getDocs, addDoc, updateDoc, query, where } from 'firebase/firestore';

const db = () => getFirestore();

// Items

export function getItems() {
  const data = collection(db(), 'items');
  
  return getDocs(data);
}

export function getItemsByCategory(id){
  if(id){
    const data = query(collection(db(), 'items'), where('categories', 'array-contains', id));
    
    return getDocs(data);
  }
  
  return getItems();
}

export function getItem(id){
  const data = doc(db(), 'items', id);

  return getDoc(data);
}

export function updateStock(stock){
  const updatePromise = new Promise((resolve) => {
    stock.forEach(async infoStock => {
      await getItem(infoStock[0]).then(item => {
        let itemData = item.data();
        const itemDoc = doc(db(), 'items', infoStock[0]);
        updateDoc(itemDoc, {stock: itemData.stock+infoStock[1]});
      })
    });

    resolve('Stock actualizado');
  })

  return updatePromise;
}

// Categories

export function getCategories(){
  const data = collection(db(), 'categories');

  return getDocs(data);
}

// Orders

export function addOrder(order){
  const orderColl = collection(db(), 'orders');

  return addDoc(orderColl, order);
}