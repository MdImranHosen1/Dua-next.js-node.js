// Import required modules
const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');

const app = express();
const port = 5000;

const db = new sqlite3.Database('./data/dua_main.sqlite');

// Enable CORS for all routes
app.use(cors());

// Define a route to retrieve data
app.get('/dua/:cId/:scId', (req, res) => {
    db.all(`SELECT * FROM dua where cat_id=${req.params.cId} AND subcat_id=${req.params.scId}`, (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(rows);
        }
    });
});

// Define a route to retrieve data
app.get('/category', (req, res) => {
    db.all('SELECT * FROM category', (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(rows);
        }
    });
});
// Define a route to retrieve data
app.get('/sub_category/:id', (req, res) => {
    db.all(`SELECT * FROM sub_category WHERE cat_id=${req.params.id}`, (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(rows);
        }
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
