var express = require('express');
var router = express.Router();

//il faut importer path pour l'utiliser
var path = require('path');

// Connection base de données
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongoDB://localhost/philippine');

// création du schéma
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    conf_password: {
        type: String,
        // required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Utilisation d'un model
var User = mongoose.model('User', userSchema);

/* GET home page. */
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

router.post('/subscribe', function(req, res) {
    // on recup les donne envoyer par le formulaire
    var mydata = new User();
    mydata.username = req.body.username;
    mydata.email = req.body.email;
    mydata.password = req.body.password;
    mydata.confPawword = req.body.conf_password;

    mydata.save()

    res.sendFile(path.join(__dirname, '../public/index.html'));
    console.log(mydata);
});

router.get('/affiche', function(req, res, next) {
    console.log('coucou')
    User
        .find({})
        .exec(function(err, users) {
            if (err)
                console.log(users)
            res.sendFile(path.join(__dirname, '../views/inscrits.html'));
            // res.end()

        })
})

module.exports = router;