var isFormVisible = false;

function toggleAddBooksForm() {
    isFormVisible = !isFormVisible;
    if (isFormVisible) {
        showAddBooksForm();
    } else {
        hideAddBooksForm();
    }
}

function showAddBooksForm() {
    // Clear previous form content
    document.getElementById('addBooksFormContainer').innerHTML = '';

    // Create form elements
    var form = document.createElement('form');
    form.classList.add('needs-validation');
    form.noValidate = true;

    var titleInput = createInput('text', 'title', 'Title', 'form-control mb-3', true);
    var authorInput = createInput('text', 'author', 'Author', 'form-control mb-3', true);
    var numberOfPageInput = createInput('text', 'numberOfPage', 'Number of Pages', 'form-control mb-3', true);
    var durationForRentingInput = createInput('text', 'durationForRenting', 'Duration for Renting', 'form-control mb-3', true);
    var descriptionInput = createInput('text', 'description', 'Description', 'form-control mb-3', true);

    var submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'Submit';
    submitButton.classList.add('btn', 'btn-primary', 'mr-2', 'rounded-3');
    submitButton.addEventListener('click', submitForm);

    var closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.id = 'closeButtonId';
    closeButton.textContent = 'Close';
    closeButton.style = 'margin-left:60px'
    closeButton.classList.add('btn', 'btn-danger','ml-3', 'rounded-3');
    closeButton.addEventListener('click', hideAddBooksForm);

    // Append form elements to the form
    form.appendChild(titleInput);
    form.appendChild(authorInput);
    form.appendChild(numberOfPageInput);
    form.appendChild(durationForRentingInput);
    form.appendChild(descriptionInput);
    form.appendChild(submitButton);
    form.appendChild(closeButton);

    // Append the form to the addBooksFormContainer div
    document.getElementById('addBooksFormContainer').appendChild(form);
}

function hideAddBooksForm() {
    // Clear the form content
    document.getElementById('addBooksFormContainer').innerHTML = '';
    isFormVisible = false;
}

function createInput(type, name, placeholder, classes, required) {
    var input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = placeholder;
    input.classList = classes;
    if (required) {
        input.required = true;
    }
    return input;
}

function submitForm() {
    // Get values from form inputs
    var title = document.getElementsByName('title')[0].value;
    var author = document.getElementsByName('author')[0].value;
    var numberOfPage = document.getElementsByName('numberOfPage')[0].value;
    var durationForRenting = document.getElementsByName('durationForRenting')[0].value;
    var description = document.getElementsByName('description')[0].value;

    // Create FormData object
    var formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('numberOfPage', numberOfPage);
    formData.append('durationForRenting', durationForRenting);
    formData.append('description', description);

    // Make a POST request using fetch
    fetch('http://localhost:8080/api/books/', {
        method: 'POST',
        credentials: 'include',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle the response data as needed
        console.log(data);
        alert('Form submitted successfully!');
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
        alert('Error submitting form');
    });
}
