const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Helper function to fetch user data from GitHub
const fetchDeveloperData = async (username) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        return { name: response.data.name, bio: response.data.bio };
    } catch (error) {
        console.error(`Error fetching data for ${username}:`, error.message);
        return { name: null, bio: null }; // Return null for failed fetch
    }
};

// POST route to handle developer information
app.post('/dev', async (req, res) => {
    const { developers } = req.body; // Extract developers array from request body

    // Validate input
    if (!developers || !Array.isArray(developers)) {
        return res.status(400).json({ error: 'Developers should be an array of GitHub usernames' });
    }

    try {
        // Fetch data for all developers concurrently
        const results = await Promise.all(developers.map(fetchDeveloperData));
        return res.json(results); // Return results as JSON
    } catch (err) {
        console.error('An error occurred while processing the request:', err.message);
        return res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

// Optional: GET route for root path
app.get('/', async (req, res) => {
    // commend out this res to print out direct message!!!
    // res.send('Welcome to the Developer Info API! Please send a POST request with a list of developers.');

    const dataToSend = { developers: ["joelburton", "elie"]};

    try {
        const response = await axios.post('http://localhost:3000/dev', {
          developers: ["joelburton", "elie"]
        });
        res.json({ message: 'Data sent to /dev', serverResponse: response.data });
      } catch (error) {
        res.status(500).json({ error: 'Failed to send POST request', details: error.message });
      }
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
