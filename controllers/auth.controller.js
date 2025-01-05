const { User, Role } = require('../model/index.model');
const authService = require('../services/auth.services');
const generateAuthToken = require('../utils/generateToken');
const {responseHandler}=require('../utils/function')

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return responseHandler(res, { success: false, messageCode: 'AUTH_400', message: 'User already exists', data: null, status: 400 });
    }
    const userRole = await Role.findOrCreate({
      where: { name: role || 'user' },
    });

    const user = await User.create({
      username,
      email,
      password,
      RoleId: userRole[0].id,
    });
    
    const token = generateAuthToken(user);

    let user_details=[{ id:user.id, username:user.username, email:user.email, role:role, token:token }]
    return responseHandler(res, { success: true, messageCode: 'AUTH_201', message: 'User registered successfully', data: user_details, status: 201 });
  } catch (err) {
    console.log("Registration error",err)
    return responseHandler(res, { success: true, messageCode: 'AUTH_001', message: 'error in register user', data: null, status: 500 });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    const isMatch = await user.validPassword(password);

    if (!user || !isMatch) {
        return responseHandler(res, {success: true,messageCode: 'AUTH_401',message: 'Invalid Credential',data: null, status: 401});
    }

    const token = generateAuthToken(user);
    let user_details=[{ id:user.id, username:user.username, email:user.email, role:user.RoleId, token:token }]

    return responseHandler(res, { success: true, messageCode: 'AUTH_201', message: 'User login successfully', data: user_details, status: 201 });

  } catch (err) {
    return responseHandler(res, { success: true, messageCode: 'AUTH_500', message: 'error in login user', data: null, status: 500 });
  }
};
