const express = require('express');
const app = express();
const port = 3000;

// Serve static files (HTML, JS, CSS)
app.use(express.static('public'));

app.get('/', (req, res) => {
    // Fetch movie data and send it to the client
    res.sendFile('/index.html', {root:__dirname})
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});