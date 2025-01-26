// mongo-init.js

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'portfolio_management';

// Connect to MongoDB
MongoClient.connect(url, function(err, client) {
  if (err) {
    console.error('Failed to connect to MongoDB:', err); // Debug: Log connection error
    return;
  }

  console.log('Connected successfully to MongoDB'); // Debug: Log successful connection
  
  const db = client.db(dbName);

  // Create a collection called 'users' if it doesn't exist
  db.createCollection('users', function(err, res) {
    if (err) {
      console.error('Error creating collection:', err); // Debug: Log collection creation error
      return;
    }
    console.log('User collection created'); // Debug: Log successful collection creation
  });

  // Create a unique index on 'username' in the 'users' collection
  db.collection('users').createIndex({ username: 1 }, { unique: true }, function(err, res) {
    if (err) {
      console.error('Error creating index:', err); // Debug: Log index creation error
      return;
    }
    console.log('Unique index created on username'); // Debug: Log successful index creation
  });

  // Close the connection
  client.close();
});
