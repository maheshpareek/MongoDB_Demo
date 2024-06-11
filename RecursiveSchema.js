const mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Connect to MongoDB
const connectionString = 'mongodb+srv://maheshp2802:M%40hesh%4002@nodeproj.a4m1w4b.mongodb.net/nodeproj?retryWrites=true&w=majority&appName=nodeproj';

mongoose.connect(connectionString)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define the base comment schema
const commentSchema = new Schema({
  comment: String,
  author: String,
  date: Date,
});

// Add a "comments" field with an array of commentSchema
commentSchema.add({ comments: [commentSchema] });

// Create the Comment model
let Comment = mongoose.model('comments', commentSchema);

// Create a new comment chain
let commentChain = new Comment({
  comment: 'Star Wars is awesome',
  author: 'Author 1',
  date: new Date(),
  comments: [
    {
      comment: 'I agree',
      author: 'Author 2',
      date: new Date(),
      comments: [
        {
          comment: 'I agree with Author 2',
          author: 'Author 3',
          date: new Date(),
          comments: [],
        },
      ],
    },
  ],
});

// Save the comment chain
commentChain
  .save()
  .then(() => {
    console.log('Comment chain was saved to the comments collection');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('There was an error saving the comment chain:', err.message);
    mongoose.connection.close();
  });
