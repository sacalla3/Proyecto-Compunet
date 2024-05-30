import { Router } from 'express';
import { getUserByUsername } from '../controller/users.js';
import { getProductById } from '../controller/products.js';

const router = Router()

router.get('/:username', async (req, res) => {
    const username = req.params.username;
    const user = getUserByUsername(username);
    console.log(user)
    console.log(user.cart.toJSON())
    res.json({cart: user.cart.toJSON()});
});

router.post('/:username/products/:productId', async (req, res) => {
    const {username, productId} = req.params;
    const user = getUserByUsername(username);
    const product = getProductById(productId)
    user.addToCart(product);
    res.json({cart: user.cart.toJSON()});
})

router.delete('/:username/products/:productId', async (req, res) => {
    const {username, productId} = req.params;
    const user = getUserByUsername(username);
    const product = getProductById(productId)
    user.removeFromCart(product);
    res.json({cart: user.cart.toJSON()});
})


export default router;