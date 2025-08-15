import React from 'react';

const COLORS = {
  in_stock: 'bg-green-100 text-green-800',
  low_stock: 'bg-yellow-100 text-yellow-800',
  out_of_stock: 'bg-red-100 text-red-800',
  preorder: 'bg-blue-100 text-blue-800',
  backorder: 'bg-purple-100 text-purple-800',
};

export default function InventoryBadge({ product }){
  // The backend should ideally return inventory info.
  // We try to infer from common fields with safe fallbacks.
  const inv = product.inventory || {};
  const available = Number(inv.available ?? product.available ?? product.stock ?? 0);
  const allowPre = Boolean(inv.allowPreorder || product.allowPreorder);
  const allowBack = Boolean(inv.allowBackorder || product.allowBackorder);
  let status = 'in_stock';
  if (available <= 0) status = allowPre ? 'preorder' : (allowBack ? 'backorder' : 'out_of_stock');
  else if (available > 0 && available <= (inv.lowStockThreshold ?? 5)) status = 'low_stock';

  const label = {
    in_stock: `In stock (${available})`,
    low_stock: `Low stock (${available})`,
    out_of_stock: `Out of stock`,
    preorder: `Pre‑order`,
    backorder: `Backorder`
  }[status];

  return <span className={`inline-flex px-2 py-1 rounded-lg text-xs font-semibold ${COLORS[status]}`}>{label}</span>;
}
