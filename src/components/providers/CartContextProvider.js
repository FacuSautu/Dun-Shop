import { useEffect, useState } from "react";

import cartContext from "../../context/cartContext";

const CartContextProvider = ({ defaultValue=[], children }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('savedCart')) || defaultValue);
  const [reload, setReload] = useState(true);

  let cartTotal = {
    "PC": 0,
    "PP": 0,
    "PE": 0,
    "PO": 0,
    "PPT": 0,
  }

  useEffect(() => {
    // Actualizacion de totales de carrito.
    Object.keys(cartTotal).forEach(piece => {
      let total = cartTotal[piece];
      cart.forEach(item => {
        if(item.price.unit == piece){
          total += item.price.quantity*item.quantity;
        }
      });
      cartTotal[piece] = total;
    });

    // Guardado en localStorage del carrito.
    if(cart.length){
      saveCart();
    }else{
      unsaveCart();
    }
  }, [cart, reload]);

  function isInCart(id){
    return cart.some(item => item.id == id);
  }

  function clearCart(){
    setCart([]);
  }

  function saveCart(){
    localStorage.setItem('savedCart', JSON.stringify(cart));
  }

  function unsaveCart(){
    localStorage.removeItem('savedCart');
  }

  function getItem(id){
    return isInCart(id) ? cart.find(item => item.id == id) : false;
  }

  function addItem(itemToAdd){
    let newCart;
    if(isInCart(itemToAdd.id)){
      newCart = cart.map(item => {
        if(item.id == itemToAdd.id){
          item.quantity += itemToAdd.quantity;
        }
        return item;
      });
    }else{
      newCart = [...cart, itemToAdd];
    }
    setCart(newCart);
  }

  function updateItem(id, item){
    let newCart = cart;
    let itemIndex = cart.indexOf(getItem(id));

    newCart[itemIndex] = item;

    setCart(newCart);
    setReload(!reload);
  }

  function removeItem(id){
    let newCart = cart;
    let itemIndex = cart.indexOf(getItem(id));
    
    newCart.splice(itemIndex, 1);
    
    setCart(newCart);
    setReload(!reload);
  }

  function calcItemsQty(){
    let qty = 0;
    cart.forEach(item => qty += item.quantity);

    return qty;
  }

  return(
    <cartContext.Provider value={{ cart, cartTotal, isInCart, clearCart, saveCart, unsaveCart, getItem, addItem, updateItem, removeItem, calcItemsQty }}>
      {children}
    </cartContext.Provider>
  );
}

export default CartContextProvider;