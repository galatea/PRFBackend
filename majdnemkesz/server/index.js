const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport');
const cors = require('cors');
const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const app = express()

const path = require('path')
const PORT = process.env.PORT || 5000
//const PORT = 3000
var app_path = '../dist/prfdeploy';





const whiteList = ['http://localhost:4200']
// app.use(cors({
//     origin: function(origin, callback) {
//         if(whiteList.indexOf(origin) >=0){
//             callback(null, true);
//         } else {
//             callback(new Error('Cors errors'));
//         }
//     }
// }));

app.use(cors({origin: 'http://localhost:4200', credentials: true}))
require('./user.model');
require('./item.model');
require('./order.model');


const userModel = mongoose.model('user');





const dbUrl = 'mongodb+srv://admin:zsolt123123@prfcluster.ariec.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(dbUrl)

mongoose.connection.on('connected', () => {console.log('db csatlakoztatva')})
mongoose.connection.on('error', (err) => {console.log('db csatlakozási hiba', err)})

mongoose.model('aru', require('./mongoose_schemes/aru.schema'))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


passport.use('local', new localStrategy(function(username, password, done) {
    userModel.findOne({username:username}, function(err, user){
        if(err) return done('Hiba a lekeres soran', null);
        if(!user) return done('Nincs ilyen felhnev', null);
        user.comparePassword(password, function(err, isMatch){
            if(err) return done(err, false);
            if(!isMatch) return done('Hibas jelszo',false);
            return done(null, user);
        })
    })
}))

passport.serializeUser(function(user,done){
    if(!user) return done('nincs megadva beléptethetp felh', null);
    return done(null, user);
});

passport.deserializeUser((function (user, done){
    if(!user) return done("nincs user akit kilehet léptetni", null);
    return done(null, user);
}));

app.use(expressSession({secret: 'zsoltaltalelkeszitettbeadando', resave:'true'}));
app.use(passport.initialize());
app.use(passport.session());



app.use('/proba', (req, res) => {
    console.log(req.body.gyakvezer)
    console.log(req.body['ora'])
    res.status(200).send('OK')
})

app.use('/', require('./routes'))
app.use('/ezegymasikroute', require('./routes'))


app.use('/', express.static(path.join(__dirname, app_path)))
.get('*', (req,res) => res.sendFile(path.join(__dirname,app_path +'/index.html')))
.listen(PORT,()=>console.log(`LISTENING ON ${PORT}`));
