import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Company Info */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Company</h2>
            <p className="mb-2">1234 Street Name</p>
            <p className="mb-2">City, State, 12345</p>
            <p className="mb-2">Email: info@ecommerce.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Navigation</h2>
            <ul>
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/shop" className="hover:underline">Shop</a></li>
              <li><a href="/about" className="hover:underline">About Us</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaFacebookF size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="w-full md:w-1/4">
            <h2 className="text-xl font-bold mb-4">Newsletter</h2>
            <form>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full p-2 mb-4 text-black"
              />
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p>&copy; 2024 Fast Shopping Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer