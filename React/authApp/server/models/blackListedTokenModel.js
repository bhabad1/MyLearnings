const mongoose = require('mongoose')
const dbCon = require('../dbConfig').dbCon;

const blackListedTokensSchema = new mongoose.Schema({
    token:{type:String, required:true},
    blackListedAt:{type:Date, default:Date.now()}
});

const blackListedTokenModel = dbCon.model(
    'blackListedTokens',
    blackListedTokensSchema,
   
  )
  module.exports = blackListedTokenModel