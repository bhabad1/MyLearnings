var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/userController');
const {checkToken, blackListToken } =require('../helper');
router.post('/login', function(req, res, next) {
 userCtrl.login(req,res,next);
});
router.post('/addUser', function(req, res, next) {
  userCtrl.addUser(req,res,next);
 });
 router.post('/getUser', checkToken,function(req, res, next) {
  userCtrl.getUser(req,res,next);
 });

 router.post('/updateUser', checkToken,function(req, res, next) {
  userCtrl.updateUser(req,res,next);
 });

 router.post('/logout', blackListToken);

module.exports = router;
