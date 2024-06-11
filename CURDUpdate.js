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

    // Update documents matching the query
    Company.updateOne({ companyName: 'The Kwik-E-Mart' }, { $set: { employeeCount: 3 } })
      .exec()
      .then(() => {
        console.log('Company document updated successfully');
        mongoose.connection.close(); // Close the connection after updating
      })
      .catch((err) => {
        console.error('Error updating company document:', err);
        mongoose.connection.close(); // Close the connection in case of error
      });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });
