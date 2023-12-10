require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

const port = process.env.PORT || 8080;

const connectDB = async (options = {}) => {
	try {
		await mongoose.connect(process.env.CONNECTION_URI, options);
		console.info("MongoDB connected successfully!");

		mongoose.connection.on("error", (error) => {
			console.error(`MongoDB connection failed - ${error}`);
		});
	} catch (error) {
		console.error(error.toString());
	}
};

app.listen(port, async () => {
	console.info(`Server is running at http://localhost:${port}`);
	await connectDB();
});
