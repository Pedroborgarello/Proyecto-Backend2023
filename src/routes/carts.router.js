import { Router } from 'express';
import CartManager from '../managers/cartManager.js';

const router = Router();
const cartManager = new CartManager();

router.post('/', (req, res) => {
    let body = req.body;
    cartManager.createCart(body).then(result => {
        res.send(result.id);
    })
})

router.get('/:cid', (req, res) => {
    let id = req.params.cid;
    id = parseInt(id);
    cartManager.getById(id).then(result => {
        res.send(result.products);
    })
})

router.post('/:cid/product/:pid', (req, res) => {
    let cid = req.params.cid;
    cid = parseInt(cid);
    let body = req.body;
    let pid = req.params.pid;
    pid = parseInt(pid)
    cartManager.addToCart(cid, body, pid).then(result => {
        res.send(result.message);
    })
})

export default router;