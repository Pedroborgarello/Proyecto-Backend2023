import express from 'express';
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js'

//crear __dirname
import { dirname } from 'path'
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// server post
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// public
app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => {
    console.log('Server listening on: ' + PORT);
});

//routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);