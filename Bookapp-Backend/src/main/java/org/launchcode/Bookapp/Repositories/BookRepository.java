package org.launchcode.Bookapp.Repositories;

import org.launchcode.Bookapp.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

//@RepositoryRestResource(collectionResourceRel = "book", path = "book")
@CrossOrigin("http://localhost:4200")
public interface BookRepository extends JpaRepository<Book, Integer> {
}
