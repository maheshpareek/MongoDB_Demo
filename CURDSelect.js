const mongoose = require('mongoose');

// MongoDB connection string
const connectionString = 'mongodb+srv://maheshp2802:M%40hesh%4002@nodeproj.a4m1w4b.mongodb.net/nodeproj?retryWrites=true&w=majority&appName=nodeproj';

// Define schema
const companySchema = new mongoose.Schema({
  companyName: String,
  address: String,
  phone: String,
  employeeCount: {
    type: Number,
    default: 0,
  },
  country: String,
});

// Define model
const Company = mongoose.model('Company', companySchema);

// Connect to MongoDB Atlas
mongoose.connect(connectionString)
  .then(() => {
    console.log('Connected to MongoDB Atlas');

    // Find documents matching the query and select specific fields
    Company.find({ companyName: 'The Kwik-E-Mart' }, 'address phone ')
      .exec()
      .then((companies) => {
        // companies will be an array of objects.
        // Each object will represent a document that matched the query
        console.log(companies);
        mongoose.connection.close(); // Close the connection after reading
      })
      .catch(err => {
        console.error('Error reading documents:', err);
        mongoose.connection.close(); // Close the connection in case of error
      });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });
