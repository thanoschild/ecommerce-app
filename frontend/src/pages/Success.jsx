import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import paymentSuccessGif from '../assest/success.gif';

function Success() {
    const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-100 to-green-300">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg text-center transform transition-all duration-700 ease-in-out scale-100 opacity-100">
        <div className="flex justify-center mb-4">
          <img
            src={paymentSuccessGif}
            alt="Payment Success"
            className="w-32 h-32 animate-bounce"
          />
        </div>
        <h1 className="text-3xl font-bold text-green-600 mb-4 animate-fadeInUp">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-700 mb-6 animate-fadeInUp delay-300">
          Thank you for your payment. Your transaction has been successfully processed.
        </p>
        <Link 
          to="/order"
          onClick={handleGoHome}
          className="p-2 px-3 mt-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white"
        >
          see Order
        </Link>
      </div>
    </div>
  );
}

export default Success