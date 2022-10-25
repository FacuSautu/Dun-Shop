import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { addOrder, updateStock } from "../../util/Firebase";
import cartContext from "../../context/cartContext";

import ItemCount from "./ItemCount";


const CartItem = ({item, onQtyChange, onDelete}) => {
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    item.quantity = quantity;
    onQtyChange(item.id, item);
  }, [quantity]);

  return(
    <div className="row w-100 my-1">
      <div className="col-2 d-flex justify-content-center align-items-center">
        <img src={item.pictureUrl} alt={item.name} width={'100px'} style={{backgroundColor: 'white'}}/>
      </div>
      <h2 className="col-4 d-flex justify-content-center align-items-center">{item.name}</h2>
      <div className="col-3 d-flex justify-content-center align-items-center">
        <ItemCount stock={item.stock} initial={item.quantity} withButton={true} onChange={(qty) => setQuantity(qty)}/>
      </div>
      <h4 className="col-2 d-flex justify-content-center align-items-center">{`${quantity*item.price.quantity} ${item.price.unit}`}</h4>
      <div className="col-1 d-flex justify-content-center align-items-center">
        <button className="btn btn-danger" onClick={() => onDelete(item.id)}>Eliminar</button>
      </div>

      <hr className="border border-dark border-1 opacity-50 my-3"></hr>
    </div>
  );
}

const Cart = () => {
  const cartCtx = useContext(cartContext);
  const [total, setTotal] = useState(cartCtx.cartTotal);
  const navigate = useNavigate();

  useEffect(() => {
    setTotal(cartCtx.cartTotal);
  }, [cartCtx]);

  const checkOut = () => {
    Swal.fire({
      title: 'Datos de comprador',
      html: `
        <form class="container-fluid">

          <div class="row">
            <div class='col-6'>
              <label for="order_name" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="order_name">
            </div>
            <div class='col-6'>
              <label for="order_surname" class="form-label">Apellido</label>
              <input type="text" class="form-control" id="order_surname">
            </div>
          </div>

          <div class="mb-3">
            <label for="order_phone" class="form-label">Teléfono</label>
            <input type="text" class="form-control" id="order_phone">
          </div>

          <div class="row">
            <div class='col-6'>
              <label for="order_email" class="form-label">E-Mail</label>
              <input type="email" class="form-control" id="order_email">
            </div>
            <div class='col-6'>
              <label for="order_re_email" class="form-label">Confirmar E-Mail</label>
              <input type="email" class="form-control" id="order_re_email">
            </div>
          </div>
          
        </form>
      `,
      confirmButtonText: 'Comprar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return new Promise((resolve, reject) => {
          let email = document.getElementById('order_email').value;
          let re_email = document.getElementById('order_re_email').value;

          if(email != re_email){
            Swal.showValidationMessage('Los E-Mails ingresados no coinciden, vuelva a intentarlo.');
          }
          resolve();
        })
      },
    }).then(res => {
      if(res.isConfirmed){
        // Datos de los imputs.
        let name = document.getElementById('order_name').value;
        let surname = document.getElementById('order_surname').value;
        let phone = document.getElementById('order_phone').value;
        let email = document.getElementById('order_email').value;

        let date = new Date;

        // Objeto de la orden de compra.
        let order = {
          buyer: { name: `${name} ${surname}`, phone, email },
          items: cartCtx.cart.map(item => ({id: item.id, title: item.name, quantity: item.quantity, price: item.price})),
          total: cartCtx.cartTotal,
          date: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        };

        // Modal de "cargando compra".
        Swal.fire({
          title: 'Generando su Compra',
          timerProgressBar: true,
          didOpen: () => {
            // Spinner de carga.
            Swal.showLoading();

            // Carga de la orden de compra.
            addOrder(order).then(({id}) => {
              let stock = cartCtx.cart.map(item => [item.id, item.quantity*-1]);
              // Modificacion de Stock.
              updateStock(stock).then(updateStock => {
                // Modal de "Carga exitosa".
                Swal.fire({
                  icon: 'success',
                  html: `Compra cargada!<br>El ID de su compra es <b>${id}<b>`
                }).then(() => {
                  cartCtx.clearCart();
                  navigate(-1);
                });
              })
            })
          }
        })
      }
    });
  }

  const onQtyChange = (id, item) => {
    cartCtx.updateItem(id, item);
  }

  const onDelete = (idItem) => {
    cartCtx.removeItem(idItem);
  }

  const onCartDelete = () => {
    Swal.fire({
      title: 'Borrar Compra',
      icon: 'warning',
      html: 'Esta por borrar todos los items seleccionados<br> ¿Quiere continuar?',
      confirmButtonText: 'Continuar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then((res) => {
      if(res.isConfirmed){
        cartCtx.clearCart();
        Swal.fire({
          icon: 'success',
          html: `Carrito vaciado exitosamente.`,
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          navigate(-1);
        });
      }
    })
  }

  if(!cartCtx.cart.length){
    return(
      <div className="p-5 col-10 offset-1 d-flex flex-column justify-content-evenly align-items-center bg-dark bg-opacity-50 text-white">
      <h1 className="my-4">Su carrito no contiene ningun item por el momento.</h1>
      <div className="col-2 d-flex justify-content-center">
        <button className="btn btn-danger" onClick={() => navigate('/')}>Volver</button>
      </div>
    </div>
    );
  }

  return(
    <div className="p-5 col-10 offset-1 d-flex flex-column justify-content-evenly align-items-center bg-dark bg-opacity-50 text-white">
      {cartCtx.cart.map(item => <CartItem key={item.id} item={item} onDelete={onDelete} onQtyChange={onQtyChange}/>)}
      <div className="w-100 d-flex justify-content-between">
        <h3>Total:</h3>
        <div className="col-6 d-flex justify-content-evenly">
          {Object.keys(total).map(piece => !(cartCtx.cartTotal[piece]>0) || <h4 key={piece}>{`${cartCtx.cartTotal[piece]} ${piece}`}</h4>)}
        </div>
      </div>
      <div className="col-4 d-flex justify-content-evenly">
        <button className="btn btn-danger" onClick={() => checkOut()}>Checkout</button>
        <button className="btn btn-dark" onClick={() => onCartDelete()}>Borrar</button>
      </div>
    </div>
  );
}

export default Cart;