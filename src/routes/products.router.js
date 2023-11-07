import { Router } from 'express';
import ProductManager from '../managers/productManager.js';

const router = Router();
const productManager = new ProductManager();

router.get('/', (req, res) => {
    let limit = req.query.limit
    limit = parseInt(limit)
    if (limit) {
        productManager.getProducts().then(result => {
            const products = result.product;
            const productsLimit = products.slice(0, limit);
            res.send(productsLimit);
        })
    } else {
        productManager.getProducts().then(result => {
            res.send(result.product);
        })
    }
})

router.get('/:pid', (req, res) => {
    let id = req.params.pid;
    id = parseInt(id);
    productManager.getProductById(id).then(result => {
        res.send(result.product);
    })
})

router.post('/', (req, res) => {
    let body = req.body;
    productManager.addProduct(body).then(result => {
        res.send(result);
    })
})

router.put('/:pid', (req, res) => {
    let id = req.params.pid;
    id = parseInt(id);
    let body = req.body;
    productManager.updateProduct(id, body).then(result => {
        res.send(result.message);
    })
})

router.delete('/:pid', (req, res) => {
    let id = req.params.pid;
    id = parseInt(id);
    productManager.deleteProduct(id).then(result => {
        res.send(result.message);
    })
})

export default router;