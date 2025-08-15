import React from 'react';
import { Link } from 'react-router-dom';
export default function NotFound(){
  return (
    <div className="text-center py-16">
      <h1 className="text-3xl font-black">404</h1>
      <p className="text-gray-600">Page not found</p>
      <Link to="/" className="btn btn-primary mt-4">Go home</Link>
    </div>
  );
}
