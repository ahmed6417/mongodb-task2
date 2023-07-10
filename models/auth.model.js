
const mongoose = require('mongoose')
const DB_URL = 'mongodb://127.0.0.1:27017/online-shop'
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
});


const User = mongoose.model('user', userSchema);


exports.createNewUser = (username, email, password) => {
return new Promise((resolve, reject)=>{
    mongoose.connect(DB_URL)
    .then(()=>{
        return User.findOne({email: email})
    }).then(user =>{
        if (user) {
            mongoose.disconnect()  
            reject('Email Is Used');
        }
        else{
            return bcrypt.hash(password, 10)
        }
    }).then(hashedPassword => {
        let user = new User({
            username: username,
            email: email,
            password: hashedPassword
        })
        return user.save()
    }).then(() => {
        mongoose.disconnect()  
        resolve()
    }).catch(err => {
        mongoose.disconnect()    
        reject(err)
    })
})
};


exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => User.findOne({ email: email}))
        .then(user=>{
            if(!user){
                mongoose.disconnect()
                reject('Thers is no user found')
            } else {
                bcrypt.compare(password, user.password).then(same => {
                    if(!same){
                        mongoose.disconnect()
                        reject('wrong password')
                    }else{
                        mongoose.disconnect()
                        resolve(user._id)
                    
                    }
                })
            }
        }).catch(err=> {
            mongoose.disconnect();
            reject(err)
        })
    });
};