import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMe } from '../slices/authSlice';

export default function Profile(){
  const dispatch = useDispatch();
  const { user } = useSelector(s=>s.auth);
  useEffect(()=>{ dispatch(fetchMe()); }, [dispatch]);
  return (
    <div className="max-w-lg card space-y-1">
      <div className="text-xl font-black">Profile</div>
      <div>Name: {user?.firstName} {user?.lastName}</div>
      <div>Email: {user?.email}</div>
      <div>Phone: {user?.phone}</div>
    </div>
  );
}
