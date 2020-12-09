
getAllBooks(); // как страница загружается - сразу загружаем список всех книг


function getAllBooks() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/books', false); // создаем запрос типа GET по адресу /books

    try {
        xhr.send(); // отправляем запрос
        if (xhr.status !== 200) { // если статус ответа на запрос не 200 (OK) - значит какая-то ошибка (хотя статусов HTTP существует много и не всегда не ОК означает ошибку)
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {

            var books = JSON.parse(xhr.response); // ответ у нас в формате json, нужно его конвертировать в объект JavaScript, для этого используем JSON.parse() функцию

            console.log(books); // выводим в консоле браузера список книг

            books.sort(function(a, b) { // отсортируем по возрастанию id
                if (a.id > b.id) {
                    return 1; }
                if (a.id < b.id) {
                    return -1; }
                return 0;
            });

            var tableBody = document.getElementById('bookTableBody');
            tableBody.innerHTML = ""; // найдем в html-шаблоне элемент с таким id, который представляет собой тело таблица, удалим все, что сейчас там находится

            for (book of books) { // для каждой книге в списке книг добавляем в тело таблицы строку с значениями книги и с кнопками
                tableBody.innerHTML += `
        
                    <tr>
                        <td>${book.id}</td>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>
                            <button type="button"
                                    class="btn btn-info"
                                    data-toggle="modal"
                                    data-target="#editBookModal"
                                    onclick="setBookDataInEditModal(${book.id}, '${book.name}', '${book.author}')">Edit  
                            </button>
                             <!-- Тут какая-то магия Bootstrap: data-toggle и data-target, чтобы при нажатии на кнопку открывось модальное окно editBookModal
                            Но нам нужно не просто открыть окно, но и передать туда данные, поэтому мы навесили на событие onclick функцию setBookDataInEditModal(),
                            в которую передаем параметры книги -->     
                        </td>
                        <td><button type="button" class="btn btn-danger" onclick="deleteBook(${book.id})">Delete</button></td> <!-- При нажатии на кнопку Delete удаляем книги по id -->
                    </tr>
                    
                `;
            }
        }
    } catch (err) { // для отлова ошибок
        alert("Запрос не удался");
    }
}

// Устанавливаем в поля ввода в модальном окне редактирования значения текущей выбранной книги
function setBookDataInEditModal(bookId, bookName, bookAuthor) {
    document.getElementById('editBookId').value = bookId;
    document.getElementById('editBookName').value = bookName;
    document.getElementById('editBookAuthor').value = bookAuthor;
}

// удаление книги по id при нажатии на Delete кнопку
function deleteBook(bookId) {

    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/books/' + bookId, false); // запрос методом DELETE

    try {
        xhr.send();
        if (xhr.status !== 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            // книга успешно удалена, теперь обновим список, чтобы таблица содержала актуальные данные
            getAllBooks();
        }
    } catch (err) {
        alert("Запрос не удался");
    }

}

// создание книги при нажатии на Create кнопку в модальном окне
function createBook() {

    var name = document.getElementById('createBookName').value;
    var author = document.getElementById('createBookAuthor').value; // получаем параметры книги из полей ввода

    var book = {name: name, author: author}; // создаем объект, описывающий книгу

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/books/', false); // запрос методом POST
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // в RESTful мы используем json формат для передачи данных


    try {
        xhr.send(JSON.stringify(book)); // переводим объект книга в строку json с помощью функции JSON.stringify и отправляем запрос
        if (xhr.status !== 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            // книга успешно добавлена, обновляем список книг
            getAllBooks();
            $('#createBookModal').modal('hide'); // скрываем модальное окно
        }
    } catch (err) {
        alert("Запрос не удался");
    }


}

// редактирование книги, при нажатии на Edit кнопку в модальном окне, аналогично функции createBook
function editBook() {

    var name = document.getElementById('editBookName').value;
    var author = document.getElementById('editBookAuthor').value;
    var id = document.getElementById('editBookId').value;

    var book = {id: id, name: name, author: author};

    let xhr = new XMLHttpRequest();
    xhr.open('PUT', '/books/' + id, false); // метод PUT обычно используется для редактировании ресурса в RESTful приложениях
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");


    try {
        xhr.send(JSON.stringify(book));
        if (xhr.status !== 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            getAllBooks();
            $('#editBookModal').modal('hide');
        }
    } catch (err) { // для отлова ошибок используем конструкцию try...catch вместо onerror
        alert("Запрос не удался");
    }

}