const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const cartSchema = new Schema({
    Id: ObjectId,
    productId: {
        type: ObjectId,
        <!-- 指向联合查询的model -->
        ref: 'Product'  
    },
    userId: ObjectId,
    productSum: { type: Number, default: 1},
    createDate: { type: Date, default: Date.now() }
});

mongoose.model('Cart', cartSchema);