const asyncHandler = require("express-async-handler");
const Book = require("../models/BookModel");
const User = require("../models/UserModel");
const { deleteImage } = require("../helpers/deleteImage");
const defaultImage = "default_book_cover.jpg";

exports.updateBookController = asyncHandler(async (req, res) => {
	const id = req.params.id;
	console.log(req.body);
	console.log(req.params.id);
  
	const updatedBook = await Book.findOneAndUpdate(
		{ _id: id },
		{
		  $set: {
			title: req.body.title,
			author: req.body.author,
			description: req.body.description,
			numberOfPage: req.body.numberOfPage,
			durationForRenting: req.body.durationForRenting,
		  },
		},
		{ new: true }
	  );
  
	if (updatedBook) {
	  return res.status(200).json({
		success: true,
		message: "Book Updated Successfully",
		book: updatedBook,
	  });
	}
  
	res.status(500).json({
	  success: false,
	  message: "Book update failed",
	});
  });


exports.addBookController = asyncHandler(async (req, res) => {
	const addNewBook = await Book.create({ ...req.body, image: req.file?.filename });

	await User.findOneAndUpdate(
		{ _id: req.decoded?._id },
		{
			$inc: { redeemPoints: 5 }, // plus 5 points
		},
		{ new: true }
	);

	if (addNewBook) {
		return res.status(200).json({
			success: true,
			message: "New book added successfully",
			book: addNewBook,
		});
	}

	res.status(500).json({
		success: false,
		message: "Book addition failed",
	});
});

exports.getAllBookController = asyncHandler(async (req, res) => {
	const allBooks = await Book.find();

	if (allBooks.length) {
		return res.status(200).json({
			success: true,
			message: "Books found",
			books: allBooks,
		});
	}

	res.status(500).json({
		success: false,
		message: "Books not found",
	});
});

exports.getSingleBookController = asyncHandler(async (req, res) => {
	const book = await Book.findById(req.params?.bookId);

	if (book) {
		return res.status(200).json({
			success: true,
			message: "Book found",
			book,
		});
	}

	res.status(404).json({
		success: false,
		message: "Book not found",
	});
});

exports.rentBookController = asyncHandler(async (req, res) => {
	const isExist = await Book.exists({ _id: req.params?.bookId });

	if (!isExist) return res.status({ message: "Book not found", success: false });

	const updatedUser = await User.findOneAndUpdate(
		{ _id: req.decoded?._id },
		{
			$addToSet: { rentedBooks: req.params?.bookId },
			$inc: { redeemPoints: -5 }, // point decrement
		},
		{ new: true }
	);

	if (updatedUser) {
		return res.status(200).json({
			success: true,
			message: "Book rented successfully",
		});
	}

	res.status(500).json({
		success: false,
		message: "Book rent process",
	});
});

exports.deleteBookController = asyncHandler(async (req, res) => {
	const isExist = await Book.findById(req.params?.bookId);

	if (!isExist)
		return res.status(404).json({
			success: false,
			message: "Book not found to delete",
		});

	const deletedBook = await Book.findByIdAndDelete(req.params?.bookId);
    // delete associate book image from public/images/books
	if (deletedBook.image !== defaultImage) deleteImage(`public/images/books/${deletedBook.image}`);

	if (deletedBook) {
		return res.status(200).json({
			success: true,
			message: "Book deleted successfully",
		});
	}

	res.status(500).json({
		success: false,
		message: "Book deletion failed",
	});
});
