const Koa = require('koa');
const app = new Koa();

<!-- 解决跨域问题 -->
const cors = require('koa2-cors');
app.use(cors({
    <!-- 可以指定哪些源头可以请求后端 -->
    origin: ['http://localhost:8080'],
    credentials: true
}));

<!-- 接收前端post请求 -->
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

<!-- 加载路由 -->
const Router = require('koa-router');
<!-- 注册登录部分 -->
let user = require('./controller/user.js');
<!-- 商品信息部分 -->
let product = require('./controller/product.js');
<!-- 商品类型部分 -->
let type = require('./controller/type.js');

let router = new Router();
router.use('/user',user.routes());
router.use('/product',product.routes());
router.use('/type',type.routes());

app.use(router.routes());
app.use(router.allowedMethods());   <!--如果发送get，只接受get；如果发送post，只接受post-->

<!-- 开启服务 -->
const {connect, initSchemas} = require('./init.js');
<!-- 先连接成功，再初始化模型 -->
(async () => {
    await connect();
    initSchemas();
})();    <!--函数的立即调用-->

app.use(async (ctx) => {
    ctx.body = 'hello';
});

app.listen(3000,() => {
    console.log('start mall server')
});