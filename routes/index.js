var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));

// Connection base de données
var mongoose = require('mongoose');
mongoose.connect('mongoDB://localhost/philippine');

mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.collection('fiches').find().toArray(function(err, items) {
    tab = items;
});
db.once('open', function() {
    // we're connected!
});



// var collection = db.collection('utilisateur')
// collection.insert({
//         username: '',
//         email: '',
//         password: '',
//         conf_password: ''
//     }, 
//     function(err, result) {
//         collection
//             .find({
//                 pseudo: ''
//             })
//             .toArray(function(err, docs) {
//                 console.log(docs[0, 1, 2])
//             })
//     }),

/* GET home page. */
router.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.get('/affiche', function(req, res) {
    res.json(tab);

    // router.post('/inscrit', function(req, res) {
    //     var data = {
    //         username: req.body.username,
    //         email: req.body.email,
    //         // password : req.body.password,
    //         // confPassword : req.body.confPassword
    //     };
    //     res.send('Liste des utilisateurs' + '<br>' + 'username :' + '' + username + '<br>' + 'email :' + '' + email)
})

module.exports = router;