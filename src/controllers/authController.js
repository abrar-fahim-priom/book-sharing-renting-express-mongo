const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const { createJsonWebToken } = require("../helpers/jsonwebtoken");

exports.loginController = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email }).select("_id name email +password isAdmin");

	if (!user) return res.status(401).json({ success: false, message: "Credential error" });

	const isPasswordMatch = await bcrypt.compare(password, user.password);

	if (!isPasswordMatch)
		return res.status(401).json({ success: false, message: "Credential error" });

	// generate auth token
	const authToken = createJsonWebToken(
		{ _id: user._id, email: user.email, isAdmin: user.isAdmin },
		process.env.JWT_AUTH_TOKEN_SECRET,
		"7d"
	);

	// preserve token in cookie
	res.cookie("auth_token", authToken, {
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
		httpOnly: false,
		secure: true,
		sameSite: "none",
	});

	// remove password from user object
	delete user._doc?.password;

	res.status(200).json({
		success: true,
		message: "Login successful",
		user,
	});
});

exports.registerUserController = asyncHandler(async (req, res) => {
    const usersExists = await User.exists({ email: req.body?.email });

    if (usersExists) {
        const response = {
            success: false,
            message: "User already exists",
        };

        return res.status(409).json(response);
    }

    const addUser = await User.create(req.body);

    if (addUser) {
        const successResponse = {
            success: true,
            message: "User registered successfully! You can now Login",
            user: addUser,
        };

        return res.status(201).json(successResponse);
    }

    const errorResponse = {
        success: false,
        message: "Failed to send mail",
    };

    return res.status(500).json(errorResponse);
});


exports.getLoggedInUserController = asyncHandler(async (req, res) => {
	const userInfo = await User.findById(req.decoded?._id).populate("rentedBooks");

	if (userInfo) {
		return res.status(200).json({
			success: true,
			message: "User information found",
			user: userInfo,
		});
	}

	res.status(404).json({
		success: false,
		message: "User information not found",
	});
});

exports.logoutController = asyncHandler(async (req, res) => {
	 res.clearCookie('auth_token', {
        httpOnly: false,
        secure: true,
        sameSite: 'none',
    });

    res.status(200).json({
        success: true,
        message: 'auth_token cookie cleared',
    });
});

exports.getAllUsersController = asyncHandler(async (req, res) => {
	const allUsers = await User.find().lean();

	if (allUsers.length) {
		return res.status(200).json({
			success: true,
			message: "Users found",
			users: allUsers,
		});
	}

	res.status(500).json({
		success: false,
		message: "Users not found",
	});
});

exports.deleteUserController = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params?.userId);

	if (user && !user.isAdmin) {
		await User.findOneAndDelete({ _id: req.params?.userId, isAdmin: false });
		return res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	}
	res.status(500).json({
		success: false,
		message: "User deletion failed, Expected reason: user not found or user is an Admin",
	});
});
