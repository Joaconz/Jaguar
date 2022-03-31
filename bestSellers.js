class ProductoBestSellers {
    constructor (id, nombre, direccion, img, descripcion){
        this.id= parseInt(id);
        this.nombre= nombre;
        this.direccion= direccion;
        this.img = img;
        this.descripcion=descripcion;
        }
}

const bestSellersArray=[];//array de best Sellers

fetch("bestSellers.json")
.then((resp)=> resp.json())
.then((data)=>{
    for (const producto of data) {
        bestSellersArray.push(new ProductoBestSellers(producto.id, producto.nombre, producto.direccion, producto.img, producto.descripcion));
      }
    for (let index = 0; index < bestSellersArray.length; index++) {
    let bestSellersDiv = document.getElementById("bestSellersJavascript");
    let div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `<div class="card h-100">
                        <img src="${bestSellersArray[index].img}" class="card-img-top">
                        <div class="card-body">
                        <h5 class="card-title">${bestSellersArray[index].nombre}</h5>
                        <p class="card-text">${bestSellersArray[index].descripcion}<br><br>
                        
                        <button type="button" class="btn btn-primary">
                        <a href="${bestSellersArray[index].direccion}" class="link_bestSellers">Ir a ver                        
                        </button>
                        
                        
                        </div>
                        </div>`
    bestSellersDiv.appendChild(div);
}

    
})






