async function fetchUserInfo() {
  try {
    const response = await fetch("http://localhost:8080/api/auth/logged-user", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Error fetching user information:", error);
  }
}

async function updateUserInformation() {
  const user = await fetchUserInfo();

  if (!user) {
    return;
  }

  // Update user name
  const currentUserElement = document.getElementById("current-user");
  if (currentUserElement) {
    currentUserElement.textContent = user.name;
  }

  // Update redeem points
  const currentUserPointElement = document.getElementById("current-user-point");
  if (currentUserPointElement) {
    currentUserPointElement.textContent = user.redeemPoints;
  }
}
// Function to fetch data from the API
async function fetchData() {
  try {
    const response = await fetch("http://localhost:8080/api/books");
    const data = await response.json();
    return data.books;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
async function populateBooks() {
  const books = await fetchData();

  if (!books) {
    return;
  }

  var bookContainer = document.getElementById("book-loops");

  books.forEach(function (book) {
    var bookItem = document.createElement("div");
    bookItem.className = "col-md-3 product-item";
    bookItem.innerHTML = `
          <div class="col-md-12">
              <figure class="product-style" style="position: relative;">
                  <img src="images/tab-item1.jpg" alt="Books" class="product-item">
                  <button type="button" onclick="rentBook('${book._id}')" class="add-to-cart" id="rentBook" data-product-tile="add-to-cart">Rent this</button>
                  
                  <!-- Edit button -->
                  <button type="button" onclick="editBook('${book._id}', '${book.title}', '${book.author}', '${book.numberOfPage}', '${book.durationForRenting}', '${book.description}')" class="rounded-3 edit-book-btn" style="position: absolute; top: 5px; left: 5px;">✎</button>
                  
                  <!-- Cross button for deletion -->
                  <button type="button" onclick="confirmDelete('${book._id}')" class="rounded-3 delete-book-btn" style="position: absolute; top: 5px; right: 5px;">&#10006;</button>
              </figure>
              <figcaption>
                  <h3 id="book-title">${book.title}</h3>
                  <p id="book-author">${book.author}</p>
                  <h5><div id="book-pages" class="item-price">${book.numberOfPage} Pages</div></h5>
                  <p id="book-duration">${book.durationForRenting} Days</p>
              </figcaption>
          </div>
          <div class="bold col-md-13">
              <p class="" >Book ID :${book._id}</p>
              <p id="book-desc" class="overflow-auto">${book.description}</p>
          </div>
      `;
    bookContainer.appendChild(bookItem);
  });
}
//for editing book with passing the parameter
function editBook(bookId, title, author, numberOfPage, durationForRenting, description) {
  
  var bookDetails = {
      _id: bookId,
      title: title,
      author: author,
      numberOfPage: numberOfPage,
      durationForRenting: durationForRenting,
      description: description
  };

  // Encode the book details as a JSON string to pass it as a query parameter
  var encodedBookDetails = encodeURIComponent(JSON.stringify(bookDetails));

  // Navigate to updateBook.html with the book details as a query parameter
  window.location.href = `updateBook.html?bookDetails=${encodedBookDetails}`;
}


async function rentBook(bookId) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/books/rent/${bookId}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://127.0.0.1:5501",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    alert(data.message);
  } catch (error) {
    console.error("Error:", error.message);
    // Handle error as needed
  }
}

window.onload = function () {
  updateUserInformation();
  populateBooks();
};
