const User = require('../modules/user')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const expressJwt =  require('express-jwt');



exports.singup = (req,res)=>{
    
    
        User.findOne({email: req.body.email}).exec((error, user)=>{
                if(user){
                    return res.status(400).json({
                        error: 'Email is taked'
                    })
                }
        

        const {password, name, email}= req.body;
        let username = shortId.generate()
        let profile = `${process.env.CLIENT_URL}/profile/${username}`

        let newUser = new User ({name , email , password , profile, username})
        newUser.save((erorr , success)=>{
            if(err){
                return res.status(400).json({
                    erorr: error
                })
            }
            res.json({
                message: 'Singup is success! Plese singup'
            })
        })
    })
}







exports.singin = (req,res) =>{
    const {email, password} = req.body
    // check if user exist
    User.findOne({email}).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                erorr: 'User with this E-mail does not exist. Please try again.'
            })
        }
        // authenticate
        if (!user.authenticate()){
            return res.status(400).json({
                erorr: 'Email and password do not match. Please try again.'
            })
        }
        // generarte a token and send to client
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
        res.cookie('token', token, {expiresIn: '1d'})
        const {_id , username, name , email, role} = user
        return res.json({
            token,
            user: {_id , username, name , email, role}
        })
    })

}




exports.singout = (req,res)=> {
    res.clearCookie('token')
    res.json({
        message: 'singout is success'
    })
}
exports.reqSingin = expressJwt({
    secret:  process.env.JWT_SECRET, algorithms: ['RS256']
})





