import express from 'express';
import ProductManager from './Managers/productManager.js';

const app = express();
const PORT = process.env.PORT || 8080;
const productManager = new ProductManager();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log('Server listening on: ' + PORT);
});


app.get('/', (req, res) => {
    res.send('<h1>Hola Mundo</h1>');
})

app.get('/products', (req, res) => {
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

app.get('/products/:pid', (req, res) => {
    let id = req.params.pid;
    id = parseInt(id);
    productManager.getProductById(id).then(result => {
        res.send(result.product);
    })
})