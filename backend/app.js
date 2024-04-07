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
app.get('/sub_category/dua/:cId/:scId', (req, res) => {
    db.all(`SELECT * FROM dua where subcat_id=${req.params.scId} AND cat_id=${req.params.cId}`, (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(rows);
        }
    });
});

// Define a route to retrieve data
app.get('/category/dua/:cId', (req, res) => {
    db.all(`SELECT * FROM dua where cat_id=${req.params.cId}`, (err, rows) => {
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
app.get('/sub_category/:cId', (req, res) => {
    db.all(`SELECT * FROM sub_category WHERE cat_id=${req.params.cId}`, (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(rows);
        }
    });
});


// Define a route to retrieve data section
app.get('/category/section/:cId', (req, res) => {
    db.all(`SELECT cat_name_en FROM category where cat_id=${req.params.cId} `, (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(rows);
        }
    });
});

// Define a route to retrieve data section
app.get('/sub_category/section/:cId/:scId', (req, res) => {
    db.all(`SELECT subcat_name_en FROM sub_category where subcat_id=${req.params.scId} AND cat_id=${req.params.cId}`, (err, rows) => {
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
