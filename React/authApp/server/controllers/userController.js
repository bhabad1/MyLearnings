const dbConfig = require("../dbConfig");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const userCtrl = {};
userCtrl.login = (req, res, next) => {
  try {
    let reqBody = JSON.parse(JSON.stringify(req.body));
    let query = { username: reqBody.username, password: reqBody.password };

    userModel
      .findOne(query)
      .then(async (doc) => {
        if (doc) {
          let token = await jwt.sign(
            {
              username: reqBody.username,
              isActive: true,
            },
            dbConfig.jwtSecret,
            { expiresIn: "1d" } // '120ms'
          );
          return res.status(200).json({ data: doc, token });
        }
        if (!doc) {
          return res
            .status(200)
            .json({ message: "No such user; please create one" });
        }
      })
      .catch((error) => {
        return res.status(425).json({
          status: "failed",
          message: "Error in login",
          error: error,
        });
      });
  } catch (error) {
    return res.status(400).json({ message: "Error in login", error });
  }
};

userCtrl.addUser = (req, res, next) => {
  try {
    let reqBody = JSON.parse(JSON.stringify(req.body));
    userModel
      .create(reqBody)
      .then(doc => {
        if (doc) {
          return res.status(200).json({ data: doc });
        }
      })
      .catch((error) => {
        return res.status(400).json({
          status: "failed",
          message: "Error in user creation",
          error: error,
        });
      });
  } catch (error) {
    return res.status(400).json({ message: "Error in user creation", error });
  }
};

userCtrl.getUser = (req, res, next) => {
  try {
    let reqBody = JSON.parse(JSON.stringify(req.body));
    let query = { username: reqBody.username };

    userModel
      .findOne(query)
      .then((doc) => {
        if (!doc) {
          return res
            .status(200)
            .json({ message: "No such user; please create one" });
        }
        return res.status(200).json({ data: doc });
      })
      .catch((error) => {
        return res.status(425).json({
          status: "failed",
          error: error,
        });
      });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error getting user details", error });
  }
};

userCtrl.updateUser = (req, res, next) => {
  try {
    let reqBody = JSON.parse(JSON.stringify(req.body));
    userModel
      .updateOne({ username: reqBody.username }, { $set: reqBody })
      .then((doc) => {
        return res.status(200).json({ message: "user updated successfully" ,data:reqBody});
      })
      .catch((error) => {
        return res.status(425).json({
          status: "failed",
          error: error,
        });
      });
  } catch (error) {
    return res.status(400).json({ message: "Error updating user details" });
  }
};

module.exports = userCtrl;
