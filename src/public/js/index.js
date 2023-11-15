// import ProductManager from "../../managers/productManager.js";
const socketClient = io();

socketClient.on('welcome', data => {
    console.log(data);
})

socketClient.on('products', data => {
    const html = data.map(item => {
        return `
        <div class="product">
            <div>${item.title}</div>
            <div>${item.description}</div>
            <div>${item.price}</div>
            <img class="img" src='${item.thumbnail || "https://upload.wikimedia.org/wikipedia/commons/d/da/Imagen_no_disponible.svg"}'
            <div>${item.code}</div>
            <div>${item.category}</div>  
            <div>${item.stock}</div>
        </div>    
        `
    }).join(" ");
    
    document.getElementById("productsContainer").innerHTML = html;

})

const form = document.getElementById('formProducts');

form.onsubmit = (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const thumbnail = document.getElementById("thumbnail").value;
    const category = document.getElementById("category").value;
    const stock = document.getElementById("stock").value;
    const code = document.getElementById("code").value;

    const product = {
        title: title,
        description: description,
        price: parseInt(price),
        thumbnail: thumbnail,
        stock: parseInt(stock),
        code: code,
        category: category
    }

    socketClient.emit('addProduct', product);
}