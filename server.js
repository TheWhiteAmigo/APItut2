// server.js

// BASE SETUP
//=======================================================================================================================
var mongoose   = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/APItut2')

// call the packages we need
var express    = require('express');          // Call express
var app        = express();                   // Define our app using express
var bodyParser = require('body-parser');
var Bear       = require('./app/models/bear.js');
// configure app to use bodyParser()
// this will let us get the data from a POST

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;           // Set our port

// ROUTES FOR OUR API
//========================================================================================================================
var router = express.Router();                 // Get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('something is happening.');
    next(); // make sure we go to the next routes and dont stop here
});

//test route to make sure everything is working (accessed at GET http://localhost:8080)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! wecome to our api' });

});

//more routes for our API will happen here

// on routes that end in /bears
//-------------------------------------------------------
router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        var bear = new Bear();            // create a new instance of the Bear model
        bear.name = req.body.name;       // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear Created!'});
        });
    });
//REGISTER OUR ROUTES -----------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
//========================================================================================================================
app.listen(port);
console.log('Magic happens on port' + port);