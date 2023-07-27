const mongoose = require('mongoose')
const dbCon = require('../dbConfig').dbCon;

const usersSchema = new mongoose.Schema({
    name:{type:String, required:true},
    password:String,
    mobile:String,
    email:String,
    address:String,
    username:{type:String, unique:true},
    createdAt:{type:Date, default:Date.now()}
});

const userModel = dbCon.model(
    'users',
    usersSchema,
   
  )
  module.exports = userModel