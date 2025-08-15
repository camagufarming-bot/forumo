import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../slices/ordersSlice';
import EscrowBadge from '../components/EscrowBadge';

export default function Orders(){
  const dispatch = useDispatch();
  const items = useSelector(s=>s.orders.items);
  useEffect(()=>{ dispatch(fetchMyOrders()); }, [dispatch]);
  return (
    <div className="space-y-3">
      {items.map(o=>(
        <div key={o._id} className="card space-y-1">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Order #{o.number || o._id.slice(-6)}</div>
            <EscrowBadge order={o} />
          </div>
          <div className="text-sm text-gray-500">Items: {o.items?.length} • Total: R {Number(o.total || 0).toFixed(2)}</div>
          {o.delivery?.carrier && (
            <div className="text-xs text-gray-500">Tracking: {o.delivery.carrier} • {o.delivery.trackingNumber}</div>
          )}
          {o.escrow?.status === 'funded' && (
            <div className="text-xs text-blue-700 bg-blue-50 px-3 py-2 rounded-lg">
              Payment secured in escrow. Provide tracking after dispatch. Funds release on delivery confirmation code.
            </div>
          )}
          {o.escrow?.status === 'disputed' && (
            <div className="text-xs text-red-700 bg-red-50 px-3 py-2 rounded-lg">
              Dispute in progress. Please respond with evidence in the resolution center.
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
