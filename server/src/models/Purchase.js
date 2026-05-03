import mongoose from 'mongoose';
const purchaseSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  userId: String,
  email: String,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  status: { type: String, enum: ['created', 'captured', 'failed'], default: 'created' }
}, { timestamps: true });
export default mongoose.model('Purchase', purchaseSchema);
