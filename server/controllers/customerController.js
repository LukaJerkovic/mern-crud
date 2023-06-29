const Customer = require('../models/customer');
const { calculateInsurancePrice } = require('../utils/insuranceCalculator');

const fetchCustomers = async (req, res) => {
  // Find the customers
  const customers = await Customer.find();

  // Respond with them
  res.json({ customers });
};

const fetchCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const insurancePrice = calculateInsurancePrice(
      customer.city,
      customer.dateOfBirth
    );

    // Respond with the customer
    res.json({ customer });

    // Update the customer's insurance price in the database
    customer.insurancePrice = insurancePrice;
    await customer.save();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred' });
  }
};

const createCustomer = async (req, res) => {
  // Get the sent in data off request body
  const { name, lastname, email, city, dateOfBirth } = req.body;

  // Create a customer with it
  const customer = await Customer.create({
    name,
    lastname,
    email,
    city,
    dateOfBirth,
  });

  // respond with the new customer
  res.json({ customer });
};

const updateCustomer = async (req, res) => {
  // Get the id off the url
  const customerId = req.params.id;

  // Get the data off the req body
  const { name, lastname, email, city, dateOfBirth } = req.body;

  // Find and update the record
  await Customer.findByIdAndUpdate(customerId, {
    name,
    lastname,
    email,
    city,
    dateOfBirth,
  });

  // Find updated customer
  const customer = await Customer.findById(customerId);

  // Respond with it
  res.json({ customer });
};

const deleteCustomer = async (req, res) => {
  // Get the id off the url
  const customerId = req.params.id;

  // Delete the record
  await Customer.findByIdAndDelete(customerId);

  // Respond
  res.json({ success: 'Record deleted' });
};

const calculateInsurance = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const insurancePrice = calculateInsurancePrice(
      customer.city,
      customer.dateOfBirth
    );

    res.json({ insurancePrice });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = {
  fetchCustomers,
  fetchCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  calculateInsurance,
};
