const datosObtencion = async (link) => {
  const resp = await fetch(link);
  const datos = await resp.json();
  for (const dato of datos) {
    productos.push(
      new Producto(
        dato.id,
        dato.nombre,
        dato.precio,
        dato.categoria,
        dato.img,
        dato.descripcion,
        dato.oferta
      )
    );
  }
  allProducts(productos);
};

function allProducts(productos) {
  //muestro los productos en el DOM
  for (const producto of productos) {
    let div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `<div class="card h-100">
                        <img src="${producto.img}" class="card-img-top img_compra">
                        <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text descripciones">${producto.descripcion}</p><br><br>
                        <p>Precio: ${producto.precio}$<br>
                        50% a partir del ${producto.oferta}° producto.</p>
                        <p id="promociones${producto.id}"></p>
                        <button id='${producto.id}' class="btn btn-outline-dark btnAgregarCarrito">Agregar al carrito</button>
                        </div>
                        </div>`;
    totalProductos.appendChild(div);
  }
  agregarCarrito(); //llamo a la funcion para agregar el producto seleccionado al carrito
}

function existenciaLocalStorage() {
  if ("Carrito" in localStorage) {
    //Los obtengo como objetos genericos
    const guardados = JSON.parse(localStorage.getItem("Carrito"));
    //Los transformo a objetos de tipo contacto
    for (const generico of guardados) {
      carrito.push(
        new Producto(
          generico.id,
          generico.nombre,
          generico.precio,
          generico.categoria,
          generico.img,
          generico.oferta
        )
      );
    }
    //Llamo a la funcion para generar la interfaz
    creacionCarrito(carrito);
  }
}

function agregarCarrito() {
  let botones = document.getElementsByClassName("btnAgregarCarrito");
  for (const boton of botones) {
    boton.addEventListener("click", function () {
      //Veo si el producto ya esta en el carrito
      let seleccion = carrito.find((producto) => producto.id == this.id);

      //Si existe aumento cantidad
      if (seleccion) {
        seleccion.agregarCantidad();
        //Si no existe agrego al carrito
      } else {
        seleccion = productos.find((producto) => producto.id == this.id);
        carrito.push(seleccion);
      }
      document.getElementById("promociones" + seleccion.id).innerHTML =
      seleccion.cantOferta(seleccion.oferta);
      seleccion.ofertaLabel()
      //Guardo en el localStorage
      localStorage.setItem("Carrito", JSON.stringify(carrito));
      //llamo a la funcion para crear el carrito en el DOM
      creacionCarrito(carrito);  
      //metodo Toastify
      Toastify({
        text: `Agregado al carrito! 
                               ${seleccion.nombre}`,
        duration: 1500,
        newWindow: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #BCAC9B, #856A5D)",
        },
        onClick: function () { }, // Callback after click
      }).showToast();
    });
  }
}

function creacionCarrito(carrito) {
  //creo los productos dentro del modal
  cantidadElementos.innerHTML = carrito.length;
  contenedorCarrito.innerHTML = "";
  for (let i = 0; i < carrito.length; i++) {
    let divCarrito = document.createElement("div");
    divCarrito.classList.add("row");
    divCarrito.classList.add("g-0");
    divCarrito.innerHTML = `<div class="col-md-4">
                                    <img src="${carrito[i].img}" class="img-fluid rounded-start" style="height=10px width=10px margin=10px">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${carrito[i].nombre}</h5>
                                        <p class="card-text">Precio: ${(carrito[i].ofertaLabel())}$<br>
                                        Categoria: ${carrito[i].categoria}<br>
                                        Cantidad: ${carrito[i].cantidad}</p> 
                                        <div class="btn-group me-2" role="group" aria-label="Second group">
                                          <button type="button" id="${carrito[i].id}" class="btn-sumar btn-primary">
                                          <ion-icon name="add-outline"></ion-icon>
                                          </button>
                                          <button type="button" id="${carrito[i].id}" class="btn-restar btn-primary">
                                          <ion-icon name="remove-outline"></ion-icon>
                                          </button>
                                          <button type="button" id="${carrito[i].id}" class="btn-eliminar btn-primary">
                                          <ion-icon name="close-outline"></ion-icon>
                                          </button>
                                        </div>
                                        <br>
                                        <p class="card-text" id="promociones${carrito[i].id}">${carrito[i].cantOferta(carrito[i].oferta)}</p>
                                    </div>
                                </div>`;
    contenedorCarrito.append(divCarrito);
  }

  //muestro el subtotal y creo las posibilidades de pago en cuotas dentro del modal
  totalCarrito();
  addCarrito();
  restarCarrito();
  eliminarCarrito();
}

function eliminarCarrito() {
  let btnEliminar = document.getElementsByClassName("btn-eliminar");
  for (const botones of btnEliminar) {
    botones.addEventListener("click", function () {
      let posicion = carrito.find((producto) => producto.id == this.id);
      carrito.splice(posicion, 1);
      posicion.ofertaLabel();
      creacionCarrito(carrito);
      totalCarrito();
      localStorage.setItem("Carrito", JSON.stringify(carrito));
    });
  }
}

function addCarrito() {
  let btnSumar = document.getElementsByClassName("btn-sumar");
  for (const botones of btnSumar) {
    botones.addEventListener("click", function () {
      let producto = carrito.find((p) => p.id == this.id);
      producto.agregarCantidad();
      producto.ofertaLabel();
      creacionCarrito(carrito);
      totalCarrito();
      localStorage.setItem("Carrito", JSON.stringify(carrito));
    });
  }
}
function restarCarrito() {
  let btnRestar = document.getElementsByClassName("btn-restar");
  for (const botones of btnRestar) {
    botones.addEventListener("click", function () {
      let producto = carrito.find((p) => p.id == this.id);
      if (producto.cantidad > 1) {
        producto.restarCantidad();
        producto.ofertaLabel();
        creacionCarrito(carrito);
        totalCarrito();
        localStorage.setItem("Carrito", JSON.stringify(carrito));
      }
    });
  }
}

finalizarCompra.onclick = () => {
  swal({
    title: "Estas seguro de finalizar?",
    text: "Una vez confirmada la compra, tendras que pagar!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal(
        `Compra confirmada! 
          Esta pagina se refrescara luego de 10 segundos`,
        {
          icon: "success",
        }
      );
      envioDatos();
      vaciarCarrito();
      setTimeout(() => {
        //le doy un tiempo de 3seg para que refresque la pagina y realizar una nueva compra
        location.reload();
      }, 10000);
    } else {
      swal("Salvaste tu bolsillo :)");
    }
  });
};

function vaciarCarrito() {
  carrito.slice(0, carrito.length); //vacio el carrito
  contenedorCarrito.innerHTML = ""; //vacio el carrito del modal
  cantidadElementos.innerHTML = "0"; //muestro que no hay ningun elemento en el carrito
  confirmacion.innerHTML = ""; //se elimina la informacion del subtotal
  sumaTotal = 0; //seteo el subtotal en 0 por si llega a tener un valor "basura"
  localStorage.removeItem("Carrito"); //borro la informacion en el LocalStorage
}

function envioDatos() {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(carrito),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => console.log("Success:", response));
}

function menu() {
  listElements.forEach((listElement) => {
    listElement.addEventListener("click", () => {
      listElement.classList.toggle("arrow");

      let height = 0;
      let menu = listElement.nextElementSibling;
      if (menu.clientHeight == "0") {
        height = menu.scrollHeight;
      }

      menu.style.height = `${height}px`;
    });
  });
}

function navBar() {
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 100) {
      navBar.classList.add("bg-dark", "shadow");
    } else {
      navBar.classList.remove("bg-dark", "shadow");
    }
  });
}

//---------------Funcion calcular total carrito-------------------------------
function totalCarrito() {
  //Realizo la suma total del carrito
  
  let total = carrito.reduce(
    (totalCompra, actual) => (totalCompra += actual.ofertaLabel()*actual.cantidad),
    0
  );
  confirmacion.innerHTML = `<p class="card-text">Subtotal: ${total}$<br>Como desea abonar?</p>
  <select class="form-select" aria-label="Default select example">
  <option selected>1 cuota de ${total}</option>
  <option value="1">3 cuotas de ${total / 3}</option>
  <option value="2">6 cuotas de ${total / 6}</option>
  <option value="3">12 cuotas de ${total / 12}</option>
  </select>`;
  return total;
}


