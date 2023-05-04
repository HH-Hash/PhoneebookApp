const express = require('express');
const path = require('path');


const app = express();
const port = process.env.PORT || 3000;


// Serve the static files in the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define the routes for the HTTP requests
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'app.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
