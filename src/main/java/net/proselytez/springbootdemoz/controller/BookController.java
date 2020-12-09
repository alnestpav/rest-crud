package net.proselytez.springbootdemoz.controller;

import net.proselytez.springbootdemoz.model.Book;
import net.proselytez.springbootdemoz.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // используется вместо @Controller, когда мы не используем model (как в MVC), а обмениваемся объектами в формате JSON (по умолчанию)
@RequestMapping("/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    /* RESTful - вместо url book-create, book-update, book-delete используем единый url, но разные методы HTTP
    *  Create - POST-запрос
    *  Read - GET-запрос
    *  Update - PUT или PATCH (PATCH - если обновление только части объекта, а не всего),
    *  Delete - DELETE-запрос
    *  можно почитать
    *  https://habr.com/ru/post/38730/
    *  https://javarush.ru/groups/posts/2486-obzor-rest-chastjh-1-chto-takoe-rest - там 3 части
    *  а для тестирования REST API удобно использовать Postman программу Тут можно почитать https://link.medium.com/i9I5TIos5bb
     * */

    @PostMapping
    public ResponseEntity createBook(@RequestBody Book book){
        Book createdBook = bookService.saveBook(book);
        return ResponseEntity.ok(createdBook);
    }

    @GetMapping
    public ResponseEntity getAll(){
        List<Book> books = bookService.findAll();
        return ResponseEntity.ok(books);
    }

    @GetMapping("/{id}")
    public ResponseEntity get(@PathVariable("id") Long id){
        Book book = bookService.findById(id);
        return ResponseEntity.ok(book);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateBook(@PathVariable("id") Long id, @RequestBody Book book){ // тут мы id параметр не использовали, но по-хорошему, надо проверить id == book.getId(), если нет - то ошибка
        Book updatedBook = bookService.saveBook(book);
        return ResponseEntity.ok(updatedBook);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteBook(@PathVariable("id") Long id){
        bookService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
