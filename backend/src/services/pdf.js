const puppeteer = require('puppeteer');

async function renderInvoicePDF({ user, invoice }) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  const rows = invoice.products.map((p,i) => `
    <tr>
      <td>(Product ${i+1}) ${p.name}</td>
      <td style="text-align:center">${p.qty}</td>
      <td style="text-align:right">${p.rate.toFixed(2)}</td>
      <td style="text-align:right">${(p.qty*p.rate).toFixed(2)}</td>
    </tr>
  `).join('');

  const html = `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8"/>
    <style>
      body{ font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; margin:24px; color:#1f2937}
      .hdr{ display:flex; align-items:center; justify-content:space-between; }
      .badge{ font-size:12px; color:#6b7280 }
      .card{ background:linear-gradient(90deg,#0f172a,#1e293b,#111827);
             color:#e5e7eb; padding:18px 24px; border-radius:12px; display:flex; justify-content:space-between; align-items:center; }
      table{ width:100%; border-collapse:collapse; margin-top:16px; }
      th,td{ padding:12px 14px; }
      th{ background:#111827; color:#e5e7eb; border-top-left-radius:12px; }
      tr:nth-child(even){ background:#f9fafb }
      .summary{ width:260px; border:1px solid #e5e7eb; border-radius:10px; padding:12px 16px; float:right; margin-top:16px; }
      .muted{ color:#6b7280; font-size:12px; }
      .total{ font-weight:700; }
      .footer{ clear:both; margin-top:48px; text-align:center; background:#1f2937; color:#e5e7eb; padding:12px 16px; border-radius:999px; }
    </style>
  </head>
  <body>
    <div class="hdr">
      <div style="display:flex;gap:8px;align-items:center">
        <div style="width:28px;height:28px;border-radius:6px;border:2px solid #111827"></div>
        <div>
          <div style="font-weight:700">Levitation</div>
          <div class="badge">infotech</div>
        </div>
      </div>
      <div>
        <div style="font-weight:800">INVOICE GENERATOR</div>
        <div class="badge">Sample Output</div>
      </div>
    </div>

    <div class="card">
      <div>
        <div class="badge">Name</div>
        <div style="font-weight:700;font-size:20px">${user.name}</div>
      </div>
      <div style="text-align:right">
        <div class="badge">Date</div>
        <div>${new Date(invoice.issuedAt).toLocaleDateString()}</div>
        <div class="badge">${user.email}</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th style="text-align:left;border-top-left-radius:12px">Product</th>
          <th style="text-align:center">Qty</th>
          <th style="text-align:right">Rate</th>
          <th style="text-align:right;border-top-right-radius:12px">Total Amount</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>

    <div class="summary">
      <div style="display:flex;justify-content:space-between"><div>Total Charges</div><div>$${invoice.subtotal.toFixed(2)}</div></div>
      <div class="muted" style="display:flex;justify-content:space-between"><div>GST (${invoice.gstPercent}%)</div><div>$${invoice.gstAmount.toFixed(2)}</div></div>
      <hr/>
      <div class="total" style="display:flex;justify-content:space-between"><div>Total Amount</div><div>₹ ${invoice.total.toFixed(2)}</div></div>
    </div>

    <div class="muted" style="margin-top:16px">Date: ${new Date(invoice.issuedAt).toLocaleDateString()}</div>
    <div class="footer">
      We are pleased to provide any further information you may require and look forward to assisting with your next order.
    </div>
  </body>
  </html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdf = await page.pdf({ format: 'A4', printBackground: true, margin: { top: 10, bottom: 10, left: 10, right: 10 } });
  await browser.close();
  return pdf;
}

module.exports = { renderInvoicePDF };
