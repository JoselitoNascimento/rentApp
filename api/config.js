/**
 * Arquivo: api/config.js
 * Descrição: arquivo responsável pelas geração do token
 * Data: 29/08/2021
 * Author: Joselito Nascimento
 */

const jwt = require('jsonwebtoken');

const config = {
  authSecret:'mysecret', // secret for generating jwt token
}

module.exports = config

// check if user logged in
module.exports.isAuthenticated = function (req, res, next) {
  var token = req.headers.authorization
  if (token) {
    // verifies secret and checks if the token is expired
    jwt.verify(token.replace(/^Bearer\s/, ''), config.authSecret, function(err, decoded) {
      if (err) {
        return res.status(401).json({message: 'unauthorized'})
      } else {
        return next();
      }
    });
  }
  else{
    return res.status(401).json({message: 'unauthorized'})
  }
}
