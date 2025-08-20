const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true, min: 1 },
  rate: { type: Number, required: true, min: 0 }
}, { _id: false });

const InvoiceSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: { type: [ProductSchema], required: true },
  gstPercent: { type: Number, default: 18 },
  subtotal: { type: Number, required: true },
  gstAmount: { type: Number, required: true },
  total: { type: Number, required: true },
  issuedAt: { type: Date, default: () => new Date() }
}, { timestamps: true });

module.exports = model('Invoice', InvoiceSchema);
