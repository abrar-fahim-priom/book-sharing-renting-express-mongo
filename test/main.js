const booksContainer = document.getElementById("books");
const loadingElement = document.getElementById("loading");

async function getBooks() {
	try {
		loadingElement.style.display = "block";
		const response = await fetch(`http://localhost:8080/api/books`);
		const data = await response.json();
		const books = data.books;

		books.forEach((book) => {
			const bookCard = document.createElement("div");

			const title = document.createElement("h2");
			title.textContent = book.title;
			bookCard.appendChild(title);

			const author = document.createElement("p");
			author.textContent = "Author: " + book.author;
			bookCard.appendChild(author);

			const description = document.createElement("p");
			description.textContent = "Description: " + book.description;
			bookCard.appendChild(description);

			const numberOfPages = document.createElement("p");
			numberOfPages.textContent = "Number of Pages: " + book.numberOfPage;
			bookCard.appendChild(numberOfPages);

			booksContainer.appendChild(bookCard);
			loadingElement.style.display = "none";
		});
	} catch (err) {
		loadingElement.style.display = "none";
		console.error(err.message);
	}
}

getBooks();


