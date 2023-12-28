import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Game Collection Manager App</h1>
        <p className="text-gray-700 mb-6">
          Created by Mateus Kürten Rodrigues as an introductory project to Next.js
        </p>
        <a href="/login">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go to Login/Sign Up Page
          </button>
        </a>
      </div>
    </div>
  )
}
