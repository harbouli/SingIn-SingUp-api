const mongoose =require('mongoose')
const crypto = require('crypto')
const { timeStamp } = require('console')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        max: 32,
        unique: true,
        index: true,
        lowercase: true, 
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true, 
    },
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32, 
    },
    profile: {
        type: String,
        require: true
    },
    hashed_password: {
        type: String, 
        require: true,

    },
    salt: String,
    about: {
        type: String,
        max: 1000
    },
    role: {
        type: Number, 
        trim: true,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    resetPasswordLink: {
        data: String,
        default: ''
    },
},{timeStamp: true})
userSchema.virtual('password')
    .set(function(password){
        //create temporary function called _password
        this._password = password
        // genaret salt
        this.salt = this.makeSalt()
        //encryptPassword
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function(){
        return this._password
    })
    userSchema.methods = {
        authenticatie: function (plainText){
           return  this.encryptPassword(plaintext) == this.hashed_password
        },
        encryptPassword: function(password){
            if(!password) return ''
                try {
                    crypto.createHash('sha1' , this.salt)
                    .update(password)
                    .digest('hex')
                } catch (error) {
                    return ''
                }
            
        },
        makeSalt: function () {
           return Math.round(new Date().valueOf * Math.random())+ '';
        }
    }
module.exports = mongoose.model('User', userSchema)