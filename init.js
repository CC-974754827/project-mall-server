<!-- 初始化mongoose -->
const mongoose = require('mongoose');
const db = 'mongodb://localhost/shop';   <!--对应数据库的名称，默认27017-->

<!-- 引入Schema -->
const glob = require('glob');
const path = require('path');
exports.initSchemas = () =>{    <!--导出-->
    <!-- 把所有js文件请求进来 -->
    glob.sync(path.resolve(__dirname,'./model','*.js')).forEach(require);    <!--获取绝对地址-->
}

exports.connect = () => {
    <!-- 连接数据库 -->
    mongoose.connect(db, {useNewUrlParser: true});     <!--解析url-->
    <!-- 监听数据库连接 -->
    mongoose.connection.on('disconnected',()=>{
        mongoose.connect(db);  <!--重连-->
    });
    <!-- 数据库出现错误 -->
    mongoose.connection.on('error', err =>{
        console.log(err);
        mongoose.connect(db);
    });
    <!-- 连接的时候 -->
    mongoose.connection.once('open',()=>{
        console.log('mongodb connected success');
    });
};