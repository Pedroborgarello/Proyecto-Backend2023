import { Router } from 'express';
import ProductManager from '../managers/productManager.js';

const router = Router();
const productManager = new ProductManager();

router.get('/', (req, res) => {
    productManager.getProducts().then(result => {
        const product = result.product.map( item => {
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
        
        res.render('home', { titulo: 'Proyecto Backend', subtitulo: 'Mis productos', products: product })   
    })
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts')
})

export default router;