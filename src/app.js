import express from 'express';
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import ProductManager from './managers/productManager.js';
import viewsRouter from './routes/views.router.js';

//crear __dirname
import { dirname } from 'path'
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// server port
const app = express();
const PORT = process.env.PORT || 8080;

// motor de plantillas handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// public
app.use(express.static(__dirname + '/public'));

// http Server 
const httpServer = app.listen(PORT, () => {
    console.log('Server listening on: ' + PORT);
});

// socket Server
const socketServer = new Server(httpServer);

//routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter); 
app.use('/', viewsRouter);

// Product Manager
const productManager = new ProductManager();

// events
socketServer.on('connection', socket => {
    console.log('client connected' + socket.id);

    socket.on('disconnect', () => {
        console.log('client disconnected' + socket.id);
    })

    socket.emit('welcome', 'Welcome to app with sockets');

    productManager.getProducts().then(result => {
        const products = result.product;
        socket.emit("products", products)
    })

    socket.on('addProduct', data => {
        productManager.addProduct(data).then(result => {
            console.log(result);

            productManager.getProducts().then(result => {
                const products = result.product;
                socket.emit("products", products)
            })
        })
    })
})    