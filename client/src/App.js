import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CustomerListPage from './components/CustomerListPage';
import CustomerDetailsPage from './components/CustomerDetailsPage';
import CustomerFormPage from './components/CustomerFormPage';

function App() {
  return (
    <Router>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-lg font-bold">
            Customer Management
          </Link>
          <div>
            <Link to="/addCustomer">
              <button className="text-white px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-700">
                Add Customer
              </button>
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto mt-8">
        <Routes>
          <Route path="/" element={<CustomerListPage />} />
          <Route path="/customer/:id" element={<CustomerDetailsPage />} />
          <Route path="/edit/:id" element={<CustomerFormPage />} />
          <Route path="/addCustomer" element={<CustomerFormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
