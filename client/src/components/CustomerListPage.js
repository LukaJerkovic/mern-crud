import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CustomerListPage() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('/customers');
      setCustomers(response.data.customers);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/customers/${id}`);
      // Remove the deleted customer from the state
      setCustomers(customers.filter((customer) => customer._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(customers) || customers.length === 0) {
    return <div>No customers found.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Customers</h1>
      <table className="border-collapse w-full rounded-sm">
        <thead>
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Lastname</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">City</th>
            <th className="p-2 border">Birth date</th>
            <th className="p-2 border">Insurance price</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td className="p-2 border text-center">{customer._id}</td>
              <td className="p-2 border text-center">{customer.name}</td>
              <td className="p-2 border text-center">{customer.lastname}</td>
              <td className="p-2 border text-center">{customer.email}</td>
              <td className="p-2 border text-center">{customer.city}</td>
              <td className="p-2 border text-center">
                {formatDate(customer.dateOfBirth)}
              </td>
              <td className="p-2 border text-center">
                {customer.insurancePrice}
              </td>
              <td className="p-2 border text-center">
                <Link
                  to={`/edit/${customer._id}`}
                  className="text-white px-4 py-2 rounded-md w-24 bg-blue-500 hover:bg-blue-700 mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(customer._id)}
                  className="text-white px-4 py-2 rounded-md w-24 bg-red-500 hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerListPage;
