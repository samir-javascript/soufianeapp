import mongoose from "mongoose";

const { model, models } = mongoose;
const reviewSchema = mongoose.Schema({
    user: {
        // the user that created the review
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const ProductSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        required: true
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
}, {
    timestamps: true,
});

// recalculate the countInStock each time the order goes throught;
ProductSchema.statics.updateStock = async function (orderItems) {
    for (const orderItem of orderItems) {
      const product = await this.findById(orderItem.product);
      if (product) {
        product.countInStock -= orderItem.qty;
        await product.save();
      }
    }
  };
// add image GALLERY;

const Product = models.Product || model('Product', ProductSchema);
export default Product;
