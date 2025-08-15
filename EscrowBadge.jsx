import React from 'react';

const MAP = {
  initiated: { color: 'bg-gray-100 text-gray-800', text: 'Escrow initiated' },
  funded:    { color: 'bg-blue-100 text-blue-800',  text: 'Payment in escrow' },
  confirmed: { color: 'bg-yellow-100 text-yellow-800', text: 'Seller confirmed' },
  delivered: { color: 'bg-green-100 text-green-800', text: 'Delivered — funds released' },
  disputed:  { color: 'bg-red-100 text-red-800', text: 'Disputed — on hold' }
};

export default function EscrowBadge({ order }){
  const s = order.escrow?.status || order.status;
  const meta = MAP[s] || { color:'bg-gray-100 text-gray-800', text: s || 'N/A' };
  return <span className={`inline-flex px-2 py-1 rounded-lg text-xs font-semibold ${meta.color}`}>{meta.text}</span>;
}
