const jwt = require('jsonwebtoken')
const authenticate = (req, res, next)=>{
    try{
        const token = req.params.token
        const decode = jwt.verify(token, 'secretValue')
        req.user = decode
        next()
    }
    catch(error)
    {
        res.json({
            message: 'Auth Failed'
        })
    }
}

module.exports = authenticate