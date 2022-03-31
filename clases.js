class Producto {
    constructor (id, nombre, precio, categoria, img, descripcion, oferta, cantidad){
        this.id= parseInt(id);
        this.nombre= nombre;
        this.precio=parseFloat(precio);
        this.categoria= categoria;
        this.img = img;
        this.descripcion=descripcion;
        this.oferta=oferta|| 1;
        this.cantidad = cantidad || 1;
        }

    //Metodos
    agregarCantidad (){
        this.cantidad++;
    }
    restarCantidad (){
        this.cantidad--;
    }
    cantOferta(cantidad){
        return this.cantidad >= cantidad ? "Promocion aplicada" : "Agrega mas productos para acceder a la promocion";
    }

    ofertaLabel(){
        if (this.oferta <= this.cantidad) {
            let nuevoPrecio = this.precio * 0.5;
            return nuevoPrecio;
          }
          if (this.oferta > this.cantidad) {
            return this.precio;
          }
    }
}