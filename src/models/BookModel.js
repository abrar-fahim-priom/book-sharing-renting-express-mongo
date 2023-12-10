const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: [true, "Book name is required"],
			minLength: [1, "Length of book name is can be min 2 chars"],
		},

		author: {
			type: String,
			trim: true,
			required: [true, "Author name is required"],
		},

		description: String,

		numberOfPage: {
			type: Number,
			required: true,
		},

		durationForRenting: {
			type: Number,
			required: true,
		},

		image: {
			type: String,
			trim: true,
			default: "default_book_cover.jpg",
		},
	},
	{ timestamps: true }
);

const Book = model("Book", userSchema);

module.exports = Book;
