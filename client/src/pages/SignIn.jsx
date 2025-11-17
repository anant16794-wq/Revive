import React, { useState } from 'react';

// --- Homepage Components ---
// These are the different "homepages" a user can be redirected to.

const AdminHomePage = ({ onSignOut }) => (
  <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
    <h2 className="text-3xl font-bold text-center text-gray-900">
      Admin Dashboard
    </h2>
    <p className="text-center text-gray-600">
      Welcome, Admin. You have full access to the system.
    </p>
    <button
      onClick={onSignOut}
      className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Sign Out
    </button>
  </div>
);

const ManagerHomePage = ({ onSignOut }) => (
  <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
    <h2 className="text-3xl font-bold text-center text-gray-900">
      Manager Portal
    </h2>
    <p className="text-center text-gray-600">
      Welcome, Manager. You can review your team's progress.
    </p>
    <button
      onClick={onSignOut}
      className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Sign Out
    </button>
  </div>
);

const UserHomePage = ({ onSignOut }) => (
  <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
    <h2 className="text-3xl font-bold text-center text-gray-900">
      User Homepage
    </h2>
    <p className="text-center text-gray-600">
      Welcome, User. Here are your daily tasks.
    </p>
    <button
      onClick={onSignOut}
      className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Sign Out
    </button>
  </div>
);

// --- Sign-In Page Component ---
// This is the main login form.

const SignInPage = ({ onSignIn }) => {
  const [userType, setUserType] = useState('admin'); // Default to 'admin'

  const handleSubmit = (e) => {
    e.preventDefault();
    // The onSignIn function is called with the selected user type
    // The ID and Password fields are ignored
    onSignIn(userType);
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-gray-900">Sign In</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* User Type Dropdown */}
        <div>
          <label
            htmlFor="user-type"
            className="block text-sm font-medium text-gray-700"
          >
            Sign in as
          </label>
          <select
            id="user-type"
            name="user-type"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="user">User</option>
          </select>
        </div>

        {/* Dummy User ID Field */}
        <div>
          <label
            htmlFor="user-id"
            className="block text-sm font-medium text-gray-700"
          >
            User ID
          </label>
          <input
            id="user-id"
            name="user-id"
            type="text"
            className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your User ID"
          />
        </div>

        {/* Dummy Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
          />
        </div>

        {/* Sign In Button */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

// --- Main App Component ---
// This component manages which page is currently visible.

export default function App() {
  // 'page' state determines what to show: 'signIn', 'admin', 'manager', or 'user'
  const [page, setPage] = useState('signIn');

  const handleSignIn = (userType) => {
    // This function sets the page based on the dropdown selection
    setPage(userType);
  };

  const handleSignOut = () => {
    // This function returns the user to the sign-in page
    setPage('signIn');
  };

  // Helper function to render the correct page
  const renderPage = () => {
    switch (page) {
      case 'admin':
        return <AdminHomePage onSignOut={handleSignOut} />;
      case 'manager':
        return <ManagerHomePage onSignOut={handleSignOut} />;
      case 'user':
        return <UserHomePage onSignOut={handleSignOut} />;
      case 'signIn':
      default:
        return <SignInPage onSignIn={handleSignIn} />;
    }
  };

  return (
    // This outer div centers the component on the screen
    <div className="flex items-center justify-center min-h-screen bg-gray-100 antialiased">
      {renderPage()}
    </div>
  );
}