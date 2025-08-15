import cron from "node-cron";
import { Inventory } from "../models/Inventory.js";
import { Product } from "../models/Product.js";
import { sendEmail } from "../services/email.service.js";

export function scheduleLowStockAlert() {
  cron.schedule("*/30 * * * *", async () => {
    const invs = await Inventory.find({ "stock.available": { $gte: 0 } }).populate("product");
    for (const inv of invs) {
      const p = await Product.findById(inv.product._id);
      if (p.inventoryTracking && p.lowStockThreshold > 0 && inv.stock.available <= p.lowStockThreshold) {
        await sendEmail({
          to: "seller@example.com",
          subject: `Low stock alert: ${p.title}`,
          html: `<p>Your product <b>${p.title}</b> is low on stock: ${inv.stock.available}</p>`
        });
      }
    }
  });
}
