exports.errorMiddleware = async (err, req, res, next) => {
	const statusCode = res.statusCode || 500;

	console.error(err.message);

	res.json({
		statusCode,
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};
