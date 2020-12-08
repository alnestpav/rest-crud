
getAll();

var editBookId;

function passData(bookId, bookName, bookAuthor) {
    editBookId = bookId;

    document.getElementById('editBookName').value = bookName;
    document.getElementById('editBookAuthor').value = bookAuthor;
}

function getAll() {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', '/books', false);

    try {
        xhr.send();
        if (xhr.status != 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            var tableBody = document.getElementById('bookTableBody');

            var books = JSON.parse(xhr.response);

            console.log(books);

            //books.sort((a, b) => a.id < b.id);

            books.sort(function(a, b) {
                if (a.id > b.id) {
                    return 1; }
                if (a.id < b.id) {
                    return -1; }
                return 0;
            });

            tableBody.innerHTML = "";

            for (book of books) {
                tableBody.innerHTML += `
        
            <tr>
                <td>${book.id}</td>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#editBookModal" onclick="passData(${book.id}, '${book.name}', '${book.author}')">Edit</button></td>
                <td><button type="button" class="btn btn-danger" onclick="deleteBook(${book.id})">Delete</button></td>
            </tr>
        
        
        `;
            }


        }
    } catch (err) { // для отлова ошибок используем конструкцию try...catch вместо onerror
        alert("Запрос не удался");
    }
}


//data-toggle="modal" data-target="#editBookModal"


function deleteBook(bookId) {

    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/books/' + bookId, false);


    try {
        xhr.send();
        if (xhr.status != 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            //alert("Книга удалена");

            getAll();


        }
    } catch (err) { // для отлова ошибок используем конструкцию try...catch вместо onerror
        alert("Запрос не удался");
    }


}


function createBook() {

    var name = document.getElementById('createBookName').value;
    var author = document.getElementById('createBookAuthor').value;

    var book = {name: name, author: author};

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/books/', false);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");


    try {
        xhr.send(JSON.stringify(book));
        if (xhr.status != 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            getAll();

            $('#createBookModal').modal('hide');
        }
    } catch (err) { // для отлова ошибок используем конструкцию try...catch вместо onerror
        alert("Запрос не удался");
    }


}

function editBook() {

    var name = document.getElementById('editBookName').value;
    var author = document.getElementById('editBookAuthor').value;

    var book = {id: editBookId, name: name, author: author};

    let xhr = new XMLHttpRequest();
    xhr.open('PUT', '/books/' + editBookId, false);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");


    try {
        xhr.send(JSON.stringify(book));
        if (xhr.status != 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            getAll();

            $('#editBookModal').modal('hide');
        }
    } catch (err) { // для отлова ошибок используем конструкцию try...catch вместо onerror
        alert("Запрос не удался");
    }


}
