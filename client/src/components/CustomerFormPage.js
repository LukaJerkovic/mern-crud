import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CustomerFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customerData, setCustomerData] = useState({
    name: '',
    lastname: '',
    email: '',
    city: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    if (id) {
      fetchCustomer();
    }
    // eslint-disable-next-line
  }, [id]);

  const fetchCustomer = async () => {
    try {
      const response = await axios.get(`/customers/${id}`);
      setCustomerData(response.data.customer);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await axios.put(`/customers/${id}`, customerData);
      } else {
        await axios.post('/customers', customerData);
      }
      // Perform any additional cleanup or notifications
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {id ? 'Edit Customer' : 'Add Customer'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={customerData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Lastname:</label>
          <input
            type="text"
            name="lastname"
            value={customerData.lastname}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email:</label>
          <input
            type="text"
            name="email"
            value={customerData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">City:</label>
          <input
            type="text"
            name="city"
            value={customerData.city}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Day of birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={customerData.dateOfBirth}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CustomerFormPage;
