const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

exports.getTotalUserCountController = asyncHandler(async (req, res) => {
	const totalUser = await User.countDocuments();

	res.status(200).json({
		success: true,
		message: "Total users",
		totalUser,
	});
});

exports.getTotalRentCountController = asyncHandler(async (req, res) => {
	const result = await User.aggregate([
		{
			$group: {
				_id: null,
				totalRentedBooks: { $sum: { $size: "$rentedBooks" } },
			},
		},
	]);

	if (result.length > 0) {
		const totalRentedBooks = result[0].totalRentedBooks;
		return res.status(200).json({
			message: "Total rented book info",
			success: true,
			total: totalRentedBooks,
		});
	}

	res.status(404).json({
		success: false,
		message: "No user found",
	});
});

exports.getTopPointEarnerController = asyncHandler(async (req, res) => {
	const highestRedeemUser = await User.findOne()
		.sort({ redeemPoints: -1 }) // Sort by redeemPoints in descending order
		.limit(1);

	res.status(200).json({
		success: true,
		message: "Highest Redeem User information",
		highestRedeemUser,
	});
});
