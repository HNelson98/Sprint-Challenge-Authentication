/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = {
  isValid,
  restrict
}


function isValid(user) {
  return Boolean( user.username && user.password && typeof user.password === "string");
}


function restrict(req, res, next) {
  res.status(401).json({ you: 'shall not pass!' });
};
