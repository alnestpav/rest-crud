package net.proselytez.springbootdemoz.controller;

import net.proselytez.springbootdemoz.model.Book;
import net.proselytez.springbootdemoz.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

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
    public ResponseEntity updateBook(@PathVariable("id") Long id, @RequestBody Book book){
        Book updatedBook = bookService.saveBook(book);
        return ResponseEntity.ok(updatedBook);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteBook(@PathVariable("id") Long id){
        bookService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
