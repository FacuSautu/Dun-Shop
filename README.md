
# Dun-shop

Y de entre el montón de edificaciones... encuentran una un tanto particular, su estructura estable y bien cuidada, con una buena iluminación exterior, la cual es opacada únicamente por la que proviene del interior.

En su frente, la adorna una hermosa puerta revestida de roble adornada con unas juntas doradas, y en su cenit algo logra captar su atención... logran identificar un cartel, el cual dice:

*"Bienvenidos a Dun-shop"*

*"Ahora con tienda virtual!"*


## Descripcion
Dun-shop es un e-commerce desarrollado para el **Curso de React JS de CoderHouse**. Dicha tienda esta hecha en base a un almacén general común y corriente que uno se puede encontrar dentro del universo de *Dungeons & Dragons*, en el cual se pueden encontrar desde armas a armaduras, pociones, objetos mágicos y mucho mas!
## Authors

- [@FacuSautu](https://github.com/FacuSautu)


## Dependencias
[![Swal](https://sweetalert2.github.io/images/SweetAlert2.png)](https://sweetalert2.github.io)
___
*Sweet alert 2* es una librería que lleva las aburridas y poco estéticas alertas de JavaScript a otro nivel. Con esta librería se pueden mostrar alertas con animaciones, formularios (junto a sus validaciones), imágenes, entre otras tantas cosas.

Decidí agregar esta librería al proyecto ya que ofrece un valor de detalle extra a las posibilidades dinámicas que implementa React.
## Tech Stack

**Client:** React, Bootstrap

**Server:** FireBase


## Notas para corrección
En este apartado me gustaría dejar anotadas cosas para tener en cuenta a la hora de al corrección.
#### Error con actualización de estado
Durante la implementación del contexto del carrito proveído por el CartContextProvider en el componente Cart, me cruce con el problema de que, las funciones `updateItem()` y `removeItem()` del CartContextProvider (las cuales modifican el estado ***cart***) no estaban activando el `useEffect()` existente en dicho componente el cual escucha a cambios del estado.

Lo extraño es que este no es el caso para la otra función que modifica el estado (`addItem()`), la cual realizar la modificación del estado ***cart*** y esto ejecuta el `useEffect()` correctamente.

Para solucionar este problema cree otro estado aparte (***reload***) para actualizar en estas funciones junto al estado ***cart*** para que el `useEffect()` se ejecutase.

---
**Estados del componente**

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('savedCart')) || defaultValue);
    const [reload, setReload] = useState(true);
---
**Hook de** `useEffect()`

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

---
**Función** `updateItem()`

    function updateItem(id, item){
        let newCart = cart;
        let itemIndex = cart.indexOf(getItem(id));

        newCart[itemIndex] = item;

        setCart(newCart);
        setReload(!reload);
    }
---
**Función** `removeItem()`

    function removeItem(id){
        let newCart = cart;
        let itemIndex = cart.indexOf(getItem(id));
        
        newCart.splice(itemIndex, 1);
        
        setCart(newCart);
        setReload(!reload);
    }
---