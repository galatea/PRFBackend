const router = require('express').Router()

const mongoose = require('mongoose')
const userModel = mongoose.model('user')
const itemModel = mongoose.model('item')
const oderModel = mongoose.model('order')

const passport = require('passport');

router.route('/api/user').get((req, res, next) =>{
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


router.route('/api/login').post((req,res,next)=>{
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



router.route('/api/logout').post((req, res, next) => {
        if(req.isAuthenticated()){
            req.logout();
            return res.status(200).send('Kijelentkezes megtortent');
        } else {
            return res.status(403).send('A user nem volt bejelentkezve');
        }
    }
)

router.route('/api/status').get((req,res,next) => {
    if(req.isAuthenticated()){
        return res.status(200).send(req.session.passport);
    } else {
        return res.status(403).send('A user nem volt bejelentkezve');
    }
})
//////////////// products
// Json form
// {
//     "name": "TESZT",
//     "price": "1200",
//     "piece": "2",
//     "description": "asd",
//     "picture":"https://via.placeholder.com/150/92c952"
// }
router.route('/api/item').get((req, res, next) =>{
    itemModel.find({}, (err, items) =>{
        if(err) return res.status(500).send('DB hiba');
        res.status(200).send(items);
    })
}).post((req, res, next) => {
    if(req.body.name && req.body.piece && req.body.price && req.body.description && req.body.picture){
        itemModel.findOne({name: req.body.name}, (err, items) => {
            if(err) return res.status(500).send('Db hiba');
            if(items){
                return res.status(400).send('Hiba! Mar van ilyen termek');
            }
            const itm = new itemModel({name: req.body.name, piece: req.body.piece, price: req.body.price, description:req.body.description, picture: req.body.picture});
            itm.save((error) => {
                if(error) return res.status(500).send('A mentes soran hiba tortent');
                return res.status(200).send('Sikeres mentes torent');
            });
        })
    } else {
        return res.status(400).send('Hibas keres, minden adat megadasa szukseges');
    }
}).put((req, res, next) => {
    if(req.body._id && req.body.name && req.body.piece && req.body.price && req.body.description && req.body.picture){
        itemModel.findByIdAndUpdate(req.body._id,{name: req.body.name, piece: req.body.piece, price: req.body.price, description:req.body.description, picture: req.body.picture}, function(err, result){

            if(err){
                res.send(err)
            }
            else{
                res.send(result)
            }

        })
    }})
//item lekeres
router.route('/api/getitem').get((req, res, next) => {
    if(req.body._id){
        itemModel.findOne({_id: req.body._id}, (err, items) => {
            if(err) return res.status(500).send('Db hiba');
            if(items){
                return res.status(200).send(items);
            }
        })
    } else {
        return res.status(400).send('Hibas keres, minden adat megadasa szukseges');
    }
})
//////////////// orders
// {
// "username" : "teszt",
//     "productId": "TESZT",
//     "productPrice": "124",
//     "productName": "0630123455",
//     "fullname": "12",
//     "phonenumber":"KAKUKK",
//     "address": "1200",
//     "description": "Nem kotelezo leíras"
// }
router.route('/api/order').get((req, res, next) =>{
    oderModel.find({}, (err, orders) =>{
        if(err) return res.status(500).send('DB hiba');
        res.status(200).send(orders);
    })
}).post((req, res, next) => {
    if(req.body.username && req.body.productId && req.body.productPrice && req.body.productName && req.body.fullname && req.body.phonenumber && req.body.address){
        oderModel.findOne({name: req.body.fullname}, (err, items) => {
            // if(err) return res.status(500).send('Db hiba');
            // if(items){
            //     return res.status(400).send('Hiba! Mar van ilyen termek');
            // }
            const ordr = new oderModel({username: req.body.username, productId: req.body.productId, productPrice: req.body.productPrice, productName: req.body.productName, fullname:req.body.fullname, phonenumber: req.body.phonenumber, address: req.body.address, description: req.body.description });
            ordr.save((error) => {
                if(error) return res.status(500).send(error);
                return res.status(200).send('Sikeres mentes torent');
            });
        })
    } else {
        return res.status(400).send('Hibas keres, legtobb adat megadasa szukseges');
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