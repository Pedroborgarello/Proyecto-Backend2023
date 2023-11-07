import fs from "fs";


class ProductManager {
    constructor(){
        this.products = [];
        this.id = 0;
        this.path = "../files/products.txt"
    }

    async addProduct(product){
       try {
            if (fs.existsSync(this.path)) {
                let data = await fs.promises.readFile(this.path, 'utf-8');
                const productsArray = JSON.parse(data);
                let productId = productsArray.length;

                if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock || !product.category) {
                    return console.log("Incomplete field");
                } else {
                    const productData = {
                        id: productId + 1,
                        title: title,
                        description: description,
                        price: price,
                        thumbnail: thumbnail,
                        code: code,
                        stock: stock,
                    };

                    if (productsArray.some(prod => prod.code === productData.code) && productsArray.some(prod => prod.title.toLowerCase() === productData.title.toLowerCase())){
                        return console.log({ status: 'error', message: 'the product already exists' })
                    } else {
                        productsArray.push(productData);
                        await fs.promises.writeFile(this.path, JSON.stringify(productsArray, null, 2));
                        return productsArray;
                    }
                }
            } else {
                if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock || !product.category) {
                    return console.log("Incomplete field");
                } else {
                    const productData = {
                        id: 1,
                        title: title,
                        description: description,
                        price: price,
                        thumbnail: thumbnail,
                        code: code,
                        stock: stock,
                    };

                    await fs.promises.writeFile(this.path, JSON.stringify([productData], null, 2));
                    return productData;
                }
            }

       } catch (err) {
            console.log(err);
       }
    
    }

    async getProducts(){
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8');
            let productsArray = JSON.parse(data);
            return { product: productsArray };
        } catch (err) {
            return { status: 'error', message: 'no products found' }
        }
    }
    
    async getProductById(id){
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8');
            let productsArray = JSON.parse(data);
            let product = productsArray.find(prod => parseInt(prod.id) === parseInt(id))
            if (product) {
                return { product: product };
            } else {
                return { status: 'error', message: 'the product was not found', product: null }
            }
        } catch (err) {
            return { status: 'error', message: 'the product was not found' };
        }
    }

    async updateProduct(id, obj) {
        let dataObj = {
            id: id,
            title: obj.title,
            description: obj.description,
            price: obj.price,
            code: obj.code,
            thumbnail: obj.thumbnail,
            stock: obj.stock,
            status: obj.status,
            category: obj.category,
        }
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8');
            let productsArray = JSON.parse(data);
            let products = productsArray.filter(prod => parseInt(prod.id) !== parseInt(id));
            products.push(dataObj);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
            return { product: products, message: 'product upgrade successfully' }
        } catch (err) {
            return { status: 'error', message: 'the product was not found' }
        }
    }

    async deleteProduct(id) {
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8');
            let productsArray = JSON.parse(data);
            let product = productsArray.filter(prod => parseInt(prod.id) !== parseInt(id));
            await fs.promises.writeFile(this.path, JSON.stringify(product, null, 2));
            return { product: product, message: 'product removed successfully' }
        } catch (err) {
            return { status: 'error', message: 'the product was not found' }
        }
    }
}

export default ProductManager;

