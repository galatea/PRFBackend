const router = require('express').Router()

const mongoose = require('mongoose')
const aruModel = mongoose.model('aru')
const userModel = mongoose.model('user')
const passport = require('passport');

router.route('/user').get((req, res, next) =>{
    userModel.find({}, (err, users) =>{
        if(err) return res.status(500).send('DB hiba');
        res.status(200).send(users);
    })
}).post((req, res, next) => {
    if(req.body.username && req.body.password && req.body.email){
        userModel.findOne({username: req.body.username}, (err, user) => {
            if(err) return res.status(500).send('Db hiba');
            if(user){
                return res.status(400).send('Hibas kmar van ilyen felhnev');
        }
            const usr = new userModel({username: req.body.username, password: req.body.password, email: req.body.email});
            usr.save((error) => {
                if(error) return res.status(500).send('A mentes soran hiba tortent');
                return res.status(200).send('Sikeres mentes torent');
            });
        })
    } else {
        return res.status(400).send('Hibas keres, username email es pass kell');
    }
})

router.route('/login').post((req,res,next)=>{
    if(req.body.username, req.body.password) {
        passport.authenticate('local', function(error, user){
            if(error) return res.status(500).send( error);
            req.logIn(user, function (error) {
                if(error) return res.status(500).send( error);
                return res.status(200).send('Bejelentkezes sikeres');
            })
        })(req, res);
    }
})



router.route('/logout').post((req, res, next) => {
    if(req.isAuthenticated()){
        req.logout();
        return res.status(200).send('Kijelentkezes megtortent');
    } else {
        return res.status(403).send('A user nem volt bejelentkezve');
    }
    }
)

router.route('/status').get((req,res,next) => {
    if(req.isAuthenticated()){
        return res.status(200).send(req.session.passport);
    } else {
        return res.status(403).send('A user nem volt bejelentkezve');
    }
})
///////////////////


router.route('/arukereso/:id?').get((req, res) => {
    if(req.params.id) {
        aruModel.findOne({nev: req.params.id}, (err, aru) => {
            // ha itt az elso parameternek van erteke, akkor adatbázishiba történt
            // ezeket 500-as hibával (szerverhiba) szokás jelezni
            if(err) return res.status(500).send('Hiba az aru lekerese kozben')
            if(!aru) return res.status(400).send('Nincs ilyen aru')
            return res.status(200).send(aru)
        })
    } else {
        aruModel.find((err, aruk) => {
            if(err) return res.status(500).send('Hiba az aru lekerese kozben')
            return res.status(200).send(aruk)
        })
    }
}).post((req, res) => {
    if(!req.params.id) {
        return res.status(400).send('Add meg milyen árut kell felvenni!')
    }
    if(req.body.ar && req.body.darab) {
        let aru = new aruModel({nev: req.params.id, ar: req.body.ar, 
            darab: req.body.darab})
        aru.save((err) => {
            if(err) {
                return res.status(500).send('Gond a db beszuras soran ' + err)
            }
            return res.status(200).send("Aru elmentve")
        })
    } else {
        return res.status(400).send("Hiányzik a darabszám vagy az ár")
    }
}).put((req, res) => {
    if(req.params.id) {
        if(req.body.ar || req.body.darab) {
            aruModel.findOne({nev: req.params.id}, (err, aru) => {
                if(err) return res.status(500).send('Hiba az aru lekerese kozben')
                if(!aru) return res.status(400).send('Nincs ilyen aru')
                if(req.body.ar) aru.ar = req.body.ar
                if(req.body.darab) aru.darab = req.body.darab
                aru.save((err) => {
                    if(err) {
                        return res.status(500).send('Gond a db beszuras soran ' + err)
                    }
                    return res.status(200).send("Aru frissítve")
                })
            })
        } else {
            return res.status(400).send("Nincs mit frissíteni")
        }
    } else {
        return res.status(400).send("Hiányzik az id")
    }
}).delete((req, res) => {
    if(req.params.id) {
        aruModel.deleteOne({nev: req.params.id}, (err) => {
            if(err) return res.status(500).send('Hiba az aru törlése kozben')
            if(!aru) return res.status(400).send('Nincs ilyen aru')
            return res.status(200).send('Áru sikeresen törölve (ha benne volt)')
        })
    } else {
        aruModel.deleteMany((err) => {
            if(err) return res.status(500).send('Hiba az aru lekerese kozben')
            return res.status(200).send('Toroltem mindent')
        })
    }
})


router.route('/hellow').get((req, res) => {
    return res.status(200).send('Hello World')
}).post((req, res) => {
    if(req.body.name) {
        return res.status(200).send('Hello ' + req.body.name +
        ', it is nice to meet you')
    }
    return res.status(400).send('You are rude!')
})

module.exports = router