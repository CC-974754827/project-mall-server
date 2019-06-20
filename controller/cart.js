const Koa = require('koa');
const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');

<!-- 添加购物车 -->
router.post('/addCart', async (ctx) => {
    const Cart = mongoose.model('Cart');
    const cart = new Cart(ctx.request.body);
    await cart.save().then(() => {
        ctx.body = {
            code: 200,
            message: '添加成功'
        };
    }).catch(err => {
        console.log(err);
        ctx.body = {
            code: 500,
            message: err
        };
    });     
});
<!-- 显示购物车 -->
router.get('/getCart', async (ctx)=>{
    const Cart = mongoose.model('Cart');
    await Cart.find({userId: ctx.query.userId}).populate('productId').exec().then(res=>{
        ctx.body = res;
    });
});

<!-- 删除商品信息 -->
router.post('/delCart', async (ctx)=>{
    const Cart = mongoose.model('Cart');
    await Cart.deleteOne({id: ctx.query.body}).exec().then(res=>{
        ctx.body = res;
    }).catch(err=>{
        console.log(err);
    });    
});

module.exports = router;