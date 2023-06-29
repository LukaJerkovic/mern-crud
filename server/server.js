// Load env variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Import dependencies
const express = require('express');
const cors = require('cors');
const connectToDb = require('./config/connectToDb');
const customerController = require('./controllers/customerController');
const { calculateInsurancePrice } = require('./utils/insuranceCalculator');

// Create an express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cors());

// Connect to database
connectToDb();

// Routing
app.get('/customers', customerController.fetchCustomers);
app.get('/customers/:id', customerController.fetchCustomer);
app.post('/customers', customerController.createCustomer);
app.put('/customers/:id', customerController.updateCustomer);
app.delete('/customers/:id', customerController.deleteCustomer);

app.get('/customers/:id/calculate-insurance', customerController.calculateInsurance);

// Start our server
app.listen(process.env.PORT);
