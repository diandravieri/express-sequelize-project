const { users } = require('../models');
const generateToken = require('../config/generateToken');
const { comparePassword, hashPassword } = require('../config/bcrypt');
const { errorResponse, successResponse, internalErrorResponse, notFoundResponse } = require('../config/response');
const { users } = require('../models');


async function register(req, res) {
  try {
    // cek email sudah ada atau belum 
    const { username, email, password } = req.body;
    const existingUser = await users.findOne({ where: { email } });
    if (existingUser) {
      errorResponse(res, 'Email already exists', 400);
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = await users.create({
      username,
      email,
      password: hashedPassword
    });

    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    };

    successResponse(res, 'Registered successfully', userResponse, 201);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};
