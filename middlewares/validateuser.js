
const validator = require('validator');

exports.validateUserPost = (user) => {
 if (validator.isEmail(user.email) && validator.isBoolean(user.active) && validator.isLength(user.dni, {min:9, max:9})) {return true}
}