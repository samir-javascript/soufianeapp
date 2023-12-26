import mongoose from "mongoose";

const WishListSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],

})

const WishList = mongoose.models.WishList || mongoose.model('WishList', WishListSchema)
export default WishList