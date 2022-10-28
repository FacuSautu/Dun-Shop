import { getFirestore, doc, collection, getDoc, getDocs, addDoc, updateDoc, query, where } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const db = () => getFirestore();
const auth = () => getAuth();

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

export async function getItemsByWishlist(user_id){
  let userData = await getUser(user_id);
  let wishlistItems = userData.docs[0].data().wishlist.map(async item => {
    let itemData = await getItem(item);

    return {id: itemData.id, ...itemData.data()};
  })
  
  return wishlistItems;
  
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

// Users

export function addUserAuth(email, password){
  return createUserWithEmailAndPassword(auth(), email, password);
}

export function addUser(user){
  const usersColl = collection(db(), 'users');

  return addDoc(usersColl, user);
}

export function getUser(user_id){
  const data = query(collection(db(), 'users'), where('user_id', '==', user_id));
    
  return getDocs(data);
}

export function logIn(email, password){
  return signInWithEmailAndPassword(auth(), email, password);
}

export function isLogedIn(callback){
  return onAuthStateChanged(auth(), callback);
}

export function logOut(){
  return signOut(auth());
}

export function addItemToWishList(user_id, item_id){
  getUser(user_id).then(user => {
    let userData = user.docs[0].data();
    const userDoc = doc(db(), 'users', user.docs[0].id);

    updateDoc(userDoc, {wishlist: [...userData.wishlist, item_id]});
  });
}

export function removeItemOfWishList(user_id, item_id){
  getUser(user_id).then(user => {
    let userData = user.docs[0].data();
    let itemIndex = userData.wishlist.indexOf(item_id);
    let newWishList = userData.wishlist;
    newWishList.splice(itemIndex, 1);

    const userDoc = doc(db(), 'users', user.docs[0].id);

    updateDoc(userDoc, {wishlist: newWishList});
  });
}