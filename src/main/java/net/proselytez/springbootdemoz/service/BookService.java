package net.proselytez.springbootdemoz.service;

import java.util.List;
import net.proselytez.springbootdemoz.model.Book;
import net.proselytez.springbootdemoz.repository.BookRepository;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    private final BookRepository bookRepository;

    private BookService(BookRepository bookRepository){
        this.bookRepository = bookRepository;
    }

    public Book findById(Long id){
        return bookRepository.getOne(id);
    }

    public List<Book> findAll(){
        return bookRepository.findAll();
    }

    public Book saveBook(Book book){
        return bookRepository.save(book);
    }

    public void deleteById(Long id){
        bookRepository.deleteById(id);
    }
}
