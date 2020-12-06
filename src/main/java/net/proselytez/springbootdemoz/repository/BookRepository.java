package net.proselytez.springbootdemoz.repository;

import net.proselytez.springbootdemoz.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
