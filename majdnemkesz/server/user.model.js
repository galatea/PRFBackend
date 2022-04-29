const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    username : {type: String, unique: true, required: true, lowercase: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    accesLevel: {type: String}
}, {collection: 'users'});

userSchema.pre('save', function(next){
    const user = this;
    if(user.isModified('password')){
        user.accesLevel = 'basic';
        bcrypt.genSalt(10, function (err, salt) {
            if(err){
                console.log('Hiba a salt generalasa soran');
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(error, hash){
                if(error){
                    console.log('hiba a hasheles soran');
                    return next(error);
                }
                user.password = hash;
                return next();
            })
        })
    } else {
        return next();
    }
})


//osszehasonlíto funkcio, salt ellenorzessel
userSchema.methods.comparePassword = function(password, nx){
    bcrypt.compare(password, this.password, function (err, isMatch){
        nx(err, isMatch);
    })
}
mongoose.model('user',userSchema);;