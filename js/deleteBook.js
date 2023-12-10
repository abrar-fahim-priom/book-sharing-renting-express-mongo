function confirmDelete(bookId) {
    var confirmation = window.confirm("Do you want to delete this book?");
    if (confirmation) {
        // Make a delete fetch request
        console.log(`book id = ${bookId}`);
        deleteBook(bookId);
    }
}

function deleteBook(bookId){
    fetch(`http://localhost:8080/api/books/${bookId}`, {
            method: 'DELETE',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.alert(`${bookId + data.message}`);
                    
                } else {
                    console.error('Book not found');
                }
            })
            .catch(error => {
                console.error('Error fetching book information:', error);
            });

}
