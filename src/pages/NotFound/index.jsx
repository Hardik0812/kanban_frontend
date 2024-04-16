import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-10 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-teal-600 mb-4">404 - Page Not Found</h1>
        <p className="mb-3 text-gray-800">Sorry, the page you are looking for does not exist.</p>
        <p className="text-gray-800">You can always go back to the <a href="/" className="text-teal-600 hover:underline">Go Back</a>.</p>
      </div>
    </div>
  );
};

export default NotFound;
