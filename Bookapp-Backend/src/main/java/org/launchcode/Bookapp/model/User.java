package org.launchcode.Bookapp.model;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.validation.constraints.*;
import java.util.List;


@Entity
public class User extends AbstractEntity{

//    @Id
//    @GeneratedValue
//    private int id;

    @NotBlank
    @Size(min = 1, max = 100)
    private String firstName;

    @NotBlank
    @Size(min = 1, max = 100)
    private String lastName;

    @NotBlank
    @Size(min = 1, max = 20)
    private String username;

    @NotNull
    private String pwHash;

    @Email
    @NotEmpty(message = "Email is required")
    private String email;


     @ManyToMany
     @JoinTable(
             name="user_book",
             joinColumns = @JoinColumn(name="user_id"),
             inverseJoinColumns = @JoinColumn(name="book_id")
     )
     private List<Book> books;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User(){}
    public User( String firstName, String lastName, String username, String pwHash, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.pwHash = encoder.encode(pwHash);
    }

    public String getUsername(){
        return username;
    }



    public boolean isMatchingPassword(String password) {
        String candidateHash = encoder.encode(password);
        return encoder.matches(password, pwHash);
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

//    public List<Library> getLibraries() {
//        return libraries;
//    }
//
//    public void setLibraries(List<Library> libraries) {
//        this.libraries = libraries;
//    }
}
