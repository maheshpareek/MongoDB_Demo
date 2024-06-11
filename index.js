const mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Connect to MongoDB
const connectionString = 'mongodb+srv://maheshp2802:M%40hesh%4002@nodeproj.a4m1w4b.mongodb.net/nodeproj?retryWrites=true&w=majority&appName=nodeproj';

mongoose.connect(connectionString)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define the company schema
let companySchema = new Schema({
  companyName: {
    type: String,
    unique: true,
  },
  address: String,
  phone: String,
  employeeCount: {
    type: Number,
    default: 0,
  },
  country: String,
});

// Register the Company model using the companySchema
let Company = mongoose.model('companies', companySchema);

// Create a new company
let kwikEMart = new Company({
  companyName: 'The Kwik-E-Mart',
  address: 'Springfield',
  phone: '212-842-4923',
  employeeCount: 3,
  country: 'U.S.A',
});

// Save the company
kwikEMart
  .save()
  .then(() => {
    console.log('The Kwik-E-Mart company was saved to the companies collection');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('There was an error saving the Kwik-E-Mart company:', err.message);
    mongoose.connection.close();
  });
