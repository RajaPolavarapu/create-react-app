import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
  title: String, description: String, slug: { type: String, unique: true }, price: Number,
  type: { type: String, enum: ['PDF', 'AUDIO', 'COURSE'] }, preview: String, file_url: String, isPremium: Boolean,
  lessons: [{ title: String, type: { type: String, enum: ['video', 'audio', 'text'] }, contentUrl: String, textContent: String }]
}, { timestamps: true });
export default mongoose.model('Product', productSchema);
