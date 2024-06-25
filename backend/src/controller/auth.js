const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/user');
require('dotenv').config()
const saltRounds = 10;
const registerUser = async (req, res) => {
    const { email, dob, name, password } = req.body;

    try {
        const isUserExits =  await User.findOne({email: email})
        if (isUserExits) {
          return  res.status(200).json({
                message: "User already exists.",
                success: true,
            })
        }
        // Hash the password                 (plainTextPassword, saltRound)
        // console.log(req.body);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const userDetail = await User.create({
            email: email,
            password: hashedPassword,
            dob: dob,
            name: name
        });

        const token = jwt.sign({ userId: userDetail._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.status(200)
            .json({
                message: 'Registration successful',
                success: true,
                token: token,
                data: userDetail
            });
    } catch (error) {
        console.log('Registration unsuccessful', error);

        res.status(500)
            .json({
                message: 'Registration failed',
                success: false
            });
    }
};
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Passwords match, generate JWT token
            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

            // Set the token as a cookie
            // res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // Max age is set to 1 hour (in milliseconds)

            // Return token and user data
            return res.status(200).json({ message: 'Login successful', success: true, token: token, user: user });
        } else {
            // Passwords don't match
            return res.status(401).json({ message: 'Incorrect password', success: false });
        }
    } catch (error) {
        console.log('Cannot login:', error);
        res.status(500).json({ message: 'Cannot login', success: false });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching user data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { registerUser, login, getAllUsers };
