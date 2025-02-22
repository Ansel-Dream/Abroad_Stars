const express = require('express');
const router = require('./Router/router');
const path = require('path');
const bodyParser = require('body-parser');
// const apply = require('./Database/apply_form');


const app = express();

// Serve static files e
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');

// Routes
app.use(router);
// app.use(Apply);

app.listen(8080, () => {
    console.log('server is started')
})
