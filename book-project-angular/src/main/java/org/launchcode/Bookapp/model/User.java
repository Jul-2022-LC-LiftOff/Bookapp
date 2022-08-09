package org.launchcode.Bookapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;


@Entity
public class User {

    @Id
    @GeneratedValue
    private int id;

    @NotBlank
    @Size(min = 1, max = 100)
    private String firstName;

    @NotBlank
    @Size(min = 1, max = 100)
    private String lastName;

    @NotBlank
    @Size(min = 1, max = 100)
    private String userName;

    @NotBlank
    @Size(min = 1, max = 100)
    private String password;

    @Email
    @NotEmpty(message = "Email is required")
    private String email;

    public User(int id, String firstName, String lastName, String userName, String password, String email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
    }

}
