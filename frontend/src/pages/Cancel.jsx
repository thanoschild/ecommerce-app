import React from 'react';
import { Link } from 'react-router-dom';
import cancelGif from '../assest/cancel.gif';

function Cancel() {
  
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-100 to-red-300">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-lg text-center transform transition-all duration-700 ease-in-out scale-100 opacity-100">
          <div className="flex justify-center mb-4">
            <img
              src={cancelGif}
              alt="Payment Cancelled"
              className="w-32 h-32 animate-pulse"
            />
          </div>
          <h1 className="text-3xl font-bold text-red-600 mb-4 animate-fadeInUp">
            Payment Cancelled
          </h1>
          <p className="text-lg text-gray-700 mb-6 animate-fadeInUp delay-300">
            Your payment was not successful. Please try again or contact support if the issue persists.
          </p>
          <Link
            to="/cart"
            className="p-2 px-3 mt-5 border-2 border-red-600 font-semibold text-red-600 hover:bg-red-600 hover:text-white rounded"
          >
            Go to Cart
          </Link>
        </div>
      </div>
    );
}

export default Cancel