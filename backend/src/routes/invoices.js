const router = require('express').Router();
const { requireAuth } = require('../middleware/auth');
const Invoice = require('../models/Invoice');
const User = require('../models/User');
const { renderInvoicePDF } = require('../services/pdf');

router.post('/', requireAuth, async (req, res) => {
  const { products = [], gstPercent = 18 } = req.body || {};
  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: 'Products required' });
  }
  for (const p of products) {
    if (!p.name || !Number.isFinite(p.qty) || !Number.isFinite(p.rate) || p.qty <= 0 || p.rate < 0) {
      return res.status(400).json({ error: 'Invalid product item' });
    }
  }
  const subtotal = products.reduce((s,p)=> s + p.qty*p.rate, 0);
  const gstAmount = +(subtotal * (gstPercent/100)).toFixed(2);
  const total = +(subtotal + gstAmount).toFixed(2);

  const invoice = await Invoice.create({
    user: req.user.sub,
    products, gstPercent, subtotal, gstAmount, total, issuedAt: new Date()
  });

  const user = await User.findById(req.user.sub);
  const pdf = await renderInvoicePDF({ user, invoice });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=invoice-${invoice.id}.pdf`);
  return res.send(Buffer.from(pdf));
});

module.exports = router;
