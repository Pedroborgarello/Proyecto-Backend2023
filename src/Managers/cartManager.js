import fs from 'fs';

class CartManager {
    constructor() {
        this.path = './src/files/carts.txt'
    }

    async createCart(cart) {
        try {
            if (fs.existsSync(this.path)) {
                let data = await fs.promises.readFile(this.path, 'utf-8');
                let carts = JSON.parse(data);
                let cartId = carts.length;
                if (carts.some(cartsArray => parseInt(cartsArray.id) === parseInt(cart.id))) {
                    return { status: 'error', message: 'the cart already exists' }
                } else {
                    let dataCart = {
                        id: cartId + 1,
                        products: [cart]
                    }
                    carts.push(dataCart);
                    try {
                        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
                        return { status: 'success', message: `product successfully, id: ${dataCart.id}`, id: `${dataCart.id}` }
                    } catch (err) {
                        return { status: 'error', message: 'the cart could not be created:' + err }
                    }
                }
            } else {
                let dataCart = {
                    id: 1,
                    products: [cart]
                }
                await fs.promises.writeFile(this.path, JSON.stringify([dataCart], null, 2))
                return { status: 'success', message: `cart successfully, id: ${dataCart.id}`, id: `${dataCart.id}` }
            }
        } catch (err) {
            console.log(err);
        }
    }

    async getById(id) {
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8');
            let carts = JSON.parse(data);
            let cart = carts.find(cartsArray => parseInt(cartsArray.id) === parseInt(id));
            if (cart) {
                return { products: cart.products }
            } else {
                return { status: 'error', message: 'the product was not found', product: null }
            }
        } catch (err) {
            return { status: 'error', message: 'the product was not found' }
        }
    }

    async addToCart(cid, body, pid) {
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8');
            let carts = JSON.parse(data);
            let cart = carts.find(cartsArray => parseInt(cartsArray.id) === parseInt(cid));
            if (cart) {
                let products = cart.products;
                let product = products.find(prodcutsArray => parseInt(prodcutsArray.product) === parseInt(pid));
                if (product) {
                    product.quantity++;
                    await fs.promises.writeFile(this.path, JSON.stringify(carts), null, 2)
                    return { message: 'product add to cart' }
                } else {
                    let dataNewProd = {
                        id: pid,
                        quantity: 1
                    }
                    cart.products.push(dataNewProd);
                    await fs.promises.writeFile(this.path, JSON.stringify(carts), null, 2);
                    return { product: dataNewProd, message: 'product add to cart' }
                }
            } else {
                return { status: 'error' }
            }
        } catch (err) {
            return { status: 'error', message: 'the product was not found' }
        }
    }

}

export default CartManager;