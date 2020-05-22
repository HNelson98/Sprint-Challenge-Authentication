/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const secret = require("./secret")
const jwt = require("jsonwebtoken");

module.exports = {
  isValid,
  restrict
}


function isValid(user) {
  return Boolean( user.username && user.password && typeof user.password === "string");
}


function restrict(req, res, next) {
  const token = req.headers.authorization
  if (token){
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if(err){
        res.status(401).json({message: "invalid token"})
      } else {
        req.subject = decodedToken.subject
        req.username = decodedToken.username
        next()
      }
    })
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
};
