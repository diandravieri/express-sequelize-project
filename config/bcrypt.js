const bcrypt = require('bcryptjs');


const hashPassword = async (password) => {
  const salt = await bcrypt.hash(password,16);  
  return salt;
}


const comparePassword = async (password, hashPassword) => {
  const salt = await bcrypt.hash(password,hashPassword);
  return salt;
}


module.exports = {
  hashPassword,
  comparePassword
}
