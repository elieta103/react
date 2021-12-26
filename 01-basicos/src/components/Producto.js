import React from "react";

const Producto = ({ producto, carrito, agregarProducto, productos }) => {
  const { nombre, precio, id } = producto;

  //Agregar producto al carrito
  const seleccionarProducto = (id) => {
    const producto = productos.filter((producto) => producto.id === id)[0]; //Quita los diferentes al seleccionado, el que es igual lo agrega
    agregarProducto([...carrito, producto]); //Clona el array y le agrega el ultimo seleccionado
  };

  //Elimina producto del carrito
  const eliminarProducto = (id) => {
    const productos = carrito.filter((producto) => producto.id !== id); //Deja los diferentes al seleccionado, el que es igual lo quita

    //Colocar los productos en el state
    agregarProducto(productos);
  };

  return (
    <div>
      <h2>{nombre}</h2>
      <p>$ {precio}</p>
      {productos   //Si no se envia el array de productos es el producto de carrito y muestra el btn eliminar
      ? <button type="button" onClick={() => seleccionarProducto(id)}>
          Comprar
        </button>
       : <button type="button" onClick={() => eliminarProducto(id)}>
          Eliminar
        </button>
      }
    </div>
  );
};

export default Producto;