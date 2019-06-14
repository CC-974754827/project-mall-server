<!-- 模型 -->
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

<!-- 与数据库中键值相同 -->
const userSchema = new Schema({
    userId: Schema.Types.ObjectId,
    userName: {unique: true, type: String},
    password: String,
    createDate: {type: Date, default: Date.now()}
});
<!-- 加盐加密 -->
<!-- 在save之前调用 -->
userSchema.pre('save',function(next){
    <!-- 随机生成salt 10指的是迭代次数 -->
    bcrypt.genSalt(10,(err, salt)=>{    <!--生成盐的迭代次数-->
        if(err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash)=>{
            if(err) return next(err);
            this.password = hash;
            next();
        });
    })  
});
userSchema.methods = {
    <!-- 自定义一个方法比较密码 -->
    comparePassword: (_password,password)=>{
        return new Promise((resolve,reject)=>{
            <!-- isMatch返回true或false -->
            bcrypt.compare(_password, password,(err, isMatch)=>{
                if(!err) resolve(isMatch)
                else reject(err)
            })
        });
    }
};

<!-- 发布模型 -->
mongoose.model('User', userSchema);