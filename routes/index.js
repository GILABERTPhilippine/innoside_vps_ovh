var express = require('express');
var router = express.Router();


//il faut importer path pour l'utiliser
var path = require('path');

// Connection base de données
var mongoose = require('mongoose');
mongoose.connect('mongoDB://localhost/philippine');

mongoose.Promise = global.Promise;

var tab;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.collection('fiches').find(function(err, items) {
    tab = items;
});
db.once('open', function() {
    // we're connected!
});


/* GET home page. */
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

router.post('/inscrits', function(req, res) {
    res.sendFile(path.join(__dirname, '../views/inscrits.html'));
})

router.post('/subscribe', function(req, res) {
    // on recup les donne envoyer par le formulaire
    //on creer un objet newUser
    var newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confPawword: req.body.confPawword,
    };

    //si tout est ok ici on l'enregistre dans la db
    // on verra une autre fois le code


    //si l'enregistrement c'est bien passé on renvoie l'acceuil
    // en faite pour que ca marche il faut utiliser path.join dslé :/ 
    res.sendFile(path.join(__dirname, '../public/index.html'));
    // res.json(newUser)
    console.log(newUser);
});


router.get('/affiche', function(req, res) {
    // ici on recupere dans la bdd toute les fiche
    // et on renvoie les fiche en json par exemple 
    res.json({});

})

module.exports = router;