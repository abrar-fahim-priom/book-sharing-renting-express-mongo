const asyncHandler = require("express-async-handler");
const { verifyJsonWebToken } = require("../helpers/jsonwebtoken");


exports.isLoggedIn = asyncHandler(async (req, res, next) => {
	const token = req.cookies.auth_token;

	if (token) {
		const decoded = verifyJsonWebToken(token, process.env.JWT_AUTH_TOKEN_SECRET);
		
		req.decoded = decoded;
		if (!decoded) res.status(401).json({ success: false, message: "Token expired" });
		return next();
	}

	res.status(401).json({
		success: false,
		message: "Unauthorized, Login required",
	});
});

exports.isLoggedOut = asyncHandler(async (req, res, next) => {
	const token = req.cookies.auth_token;

	if (token) {
		return res.status(409).json({ success: false, message: "User already logged in" });
	}

	next();
});

exports.isAdmin = asyncHandler(async (req, res, next) => {
	if (req.decoded?.isAdmin) {
		return next();
	}

	res.status(403).json({ success: false, message: "Forbidden, You are not an Admin." });
});
