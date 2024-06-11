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

// Query the company
Company.find({ companyName: 'The Kwik-E-Mart' })
  .exec()
  .then((companies) => {
    if (companies.length === 0) {
      console.log('No company could be found');
    } else {
      console.log(companies);
    }
    // Close the connection and exit the program
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(`There was an error: ${err}`);
    mongoose.connection.close();
  });