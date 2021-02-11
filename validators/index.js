const {validationResult} = require ('express-validator')
exports.runValidition = (req,res,next)=>{
    const erorrs = validationResult(req)
    if(!erorrs.isEmpty()){
        return res.status(422).json({erorr: erorrs.array()[0].msg})
    }
    next()
}