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

    // Create a new company document
    const kwikEMart = new Company({
      companyName: 'The Kwik-E-Mart',
      address: 'Springfield',
      phone: '212-842-4923',
      employeeCount: 3,
      country: 'U.S.A',
    });

    // Save the document
    kwikEMart.save()
      .then(() => {
        console.log('Company document saved successfully');
        mongoose.connection.close();
      })
      .catch(err => {
        console.error('Error saving company document:', err);
        mongoose.connection.close();
      });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });
