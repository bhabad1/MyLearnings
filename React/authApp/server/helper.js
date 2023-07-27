const jwt = require('jsonwebtoken')
const blackListTokenModel= require('./models/blackListedTokenModel')
const dbConfig = require('./dbConfig')


let checkToken = (req, res, next) => {
    try {
      let token = req.headers['x-access-token'] || req.headers['authorization']
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length)
      }
      if (token) {
        blackListTokenModel.findOne( {token}).then(doc=>{
          if(doc){
            return res.status(401).json({
              status: 'failed',
              msg: 'Auth Token is Black Listed',
            })
          }else{
            jwt.verify(token, dbConfig.jwtSecret, (err, decoded) => {
              if (err) {
                return res.status(401).json({
                  status: 'failed',
                  msg: 'Token is Not Valid'
                })
              } else {
                req.decoded = decoded
                next()
              }
            })
          }
        }, error=>{
          return res.status(401).json({
            status: 'failed',
            msg: 'Unable to verify Auth Token',
            error: error
          })
        })
      
      } else {
        return res.status(401).json({
          status: 'failed',
          msg: 'Auth Token Not Provided'
        })
      }
    } catch (error) {
      return res.status(401).json({
        status: 'failed',
        msg: 'Auth Token Not Provided',
        error: error
      })
    }
  }

  let blackListToken = (req,res,next)=>{
    try {
        let token = req.headers['x-access-token'] || req.headers['authorization']
        if (token.startsWith('Bearer ')) {
          token = token.slice(7, token.length)
        }
        blackListTokenModel.create({token}).then(doc=>{
            return res.status(200).json({message:"blacklisted"})
        }).catch(error=>{
            return res.status(400).json({error, message:"Error in token blacklisting"})
        })
        
    } catch (error) {
        next(error);
    }
  }

  module.exports = {
    checkToken,
    blackListToken
  }