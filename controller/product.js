<!-- 读取本地json文件 -->
const Koa = require('koa');
const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');
<!-- 对系统文件进行读写操作 -->
const fs = require('fs');
<!-- 导入数据 -->
<!-- exec()执行的意思 -->
router.get('/insertProductInfo', async (ctx)=>{
    fs.readFile('./data/product.json','utf8',(err,data)=>{
        data = JSON.parse(data);
        console.log(data);
        <!-- 计数器 -->
        let count = 0;
        const Product = mongoose.model('Product');
        data.map((value,index)=>{
            console.log(value);
            let product = new Product(value);
            <!-- 给商品随机匹配分类 1~8 -->
            product.type = Math.floor(Math.random() * 8) + 1;
            <!-- 保存商品信息 -->
            product.save().then(()=>{
                count++;
                console.log('成功'+count);
            }).catch(err=>{
                console.log('失败'+err);
            });
        });
    });
    <!-- 没有则报错404 -->
    ctx.body = '导入数据';
});
<!-- 接受请求,返回商品信息 -->
router.get('/getProductsByType', async (ctx)=>{
    const Product = mongoose.model('Product');
    <!-- skip()分页,需要整型 -->
    <!-- limit()加载几条 -->
    await Product.find({type: ctx.query.typeId}).skip(parseInt(ctx.query.start)).limit(parseInt(ctx.query.limit)).exec().then(res=>{
        ctx.body = res;
    });
});
<!-- 返回商品详情 -->
router.get('/getDetail', async (ctx)=>{
    const Product = mongoose.model('Product');
    await Product.findOne({_id: ctx.query.id}).exec().then(res=>{
        ctx.body = res;
    });
});

module.exports = router;