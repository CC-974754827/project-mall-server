<!-- 接收路由 -->
const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');

<!-- post请求，只接收post -->
<!-- 注册 -->
router.post('/registUser', async (ctx)=>{
    <!-- console.log("success"); -->
    <!-- ctx.body = '请求成功'; -->
    <!-- 获取model -->
    const User = mongoose.model('User');   <!--和发布的模型名称一致-->
    <!-- 接收post请求，封装成user对象 -->
    let newUser = new User(ctx.request.body);
    <!-- 使用save保存用户信息 -->
    await newUser.save().then(()=>{
        ctx.body = {
            code: 200,
            message: '注册成功'
        };
        }).catch(()=>{
            ctx.body = {
                code: 500,
                message: err
            };
        });
});
<!-- 登录 -->
router.post('/loginUser',async (ctx)=>{
    <!-- 接收前端发来的数据 -->
    <!-- ctx.request.body   post查询条件 -->
    <!-- ctx.query.id  get查询条件 -->
    let loginUser = ctx.request.body;
    let userName = loginUser.userName;
    let password = loginUser.password;
    <!-- 引入model -->
    const User = mongoose.model('User');
    <!-- 查询用户名是否存在，存在再去比较密码 -->
    <!-- User.findOne({模型里的名, 上面定义的名}) -->
    <!-- .exec()表示执行前面的代码 -->
    await User.findOne({userName: userName}).exec().then(async (result)=>{
        <!-- 返回的userName是一个对象，包含其密码 -->
        if(result){
            let newUser = new User();
            <!-- 该comparePassword()返回promise对象 -->
            await newUser.comparePassword(password, result.password).then(isMatch => {
                if(isMatch){
                    <!-- 登录成功 -->
                    ctx.body = {
                        code: 200,
                        message: '登录成功',
                        userInfo: result
                    };
                }else{
                    <!-- 登录失败 -->
                    ctx.body = {
                        code: 201,
                        message: '登录失败'
                    };
                }
            });
        }else{
            ctx.body={
                code: 201,
                message:'用户不存在'
            }
        }
    });
});

<!-- 把router导出 -->
module.exports = router;