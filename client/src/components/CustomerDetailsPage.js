import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function CustomerDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    try {
      const response = await axios.get(`/customers/${id}`);
      setCustomer(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    navigate.push(`/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/customers/${id}`);
      // Perform any additional cleanup or notifications
      navigate.push('/');
    } catch (error) {
      console.error(error);
    }
  };

const handleCalculateInsurance = async () => {
  try {
    const response = await axios.get(`/customers/${id}/calculate-insurance`);
    const updatedInsurancePrice = response.data.insurancePrice;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      insurancePrice: updatedInsurancePrice,
    }));
    fetchCustomer(); // Fetch updated customer data
  } catch (error) {
    console.error(error);
  }
};




  return (
    <div>
      {customer ? (
        <div>
          <h2 className="text-2xl font-bold mb-2">Name: {customer.name}</h2>
          <h2 className="text-2xl font-bold mb-2">
            Lastname: {customer.lastname}
          </h2>
          <h2 className="text-2xl font-bold mb-2">Email: {customer.email}</h2>
          <h2 className="text-2xl font-bold mb-2">City: {customer.city}</h2>
          <h2 className="text-2xl font-bold mb-2">
            Birth date: {customer.dateOfBirth}
          </h2>
          <h2 className="text-2xl font-bold mb-2">
            Insurance price: {customer.insurancePrice}
          </h2>
          <button
            onClick={handleEdit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2"
          >
            Delete
          </button>
          {customer.insurancePrice ? (
            <h2 className="text-2xl font-bold mb-2">
              Insurance price: {customer.insurancePrice}
            </h2>
          ) : (
            <button
              onClick={handleCalculateInsurance}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
            >
              Calculate Insurance
            </button>
          )}
        </div>
      ) : (
        <p>Loading customer details...</p>
      )}
      <Link to="/" className="text-blue-500 hover:underline mt-4">
        Back to List
      </Link>
    </div>
  );
}

export default CustomerDetailsPage;
