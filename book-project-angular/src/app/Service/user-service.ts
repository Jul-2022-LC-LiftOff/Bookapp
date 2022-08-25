import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { User } from "../model/user";
import { Book } from "../model/book";

@Injectable({ providedIn: "root" })
export class UserService {

    constructor(private http: HttpClient) {

    }

    // TODO: change header name to title of app 
    // No Duplicate Username Validation
    duplicateUserCheck(user: { username: string, email: string }) {
        const headers = new HttpHeaders({ "myHeader": "bookAppHeader" });
        this.http.get<{ exists: boolean }>(
            `http://localhost:8080/user/exsists`,
            { headers: headers }).subscribe((res) => {
                console.log(res)
                // Additional code HERE!! 
            })
    }

    /* validation method to see if a new user can be created in the table, should
    respond with a simple boolean true or false. To me it makes sense to just send the users username
    and email as those will be the best unique identifiers*/

    userLogin(user: { username: string, password: string }) {
        const headers = new HttpHeaders({ "myHeader": "bookAppHeader" });
        this.http.get<{ "user": User }>(
            'http://localhost:8080/login',
            { headers: headers }).subscribe((res) => {
                console.log(res)
                // front end return code here, JWT token should be coming back here
            })
    }

    createNewUser(newUser: {
        firstName: string,
        lastName: string,
        email: string,
        username: string,
        password: string
    }) {
        const headers = new HttpHeaders({ "myHeader": "bookAppHeader" });
        this.http.post<Object>(
            `http://localhost:8080/user`,
            newUser,
            { headers: headers }).subscribe((res) => {
                console.log(res)
                // will send new user object to api based on data procured from the form
            })
    }

    getUserLibrary(userId: number) {
        const headers = new HttpHeaders({ "myHeader": "bookAppHeader" });
        this.http.get<Object>(
            `http://localhost:8080/user${userId}/library`,
            { headers: headers }).subscribe((res) => {
                console.log(res)
                // front end return code here, json with user id, and list of book id numbers?

                // I THINK THERE NEEDS TO BE A FETCH LIBRARY FUNCTION NESTED HERE
                // Im not sure how the database will be structured but user library may have to be it own
                // relational table 

                //     .pipe(map(res) => {
                //         const library: [];
                //         for(key in res) {
                //             if (res.hasOwnProperty(key)) {
                //                 library.push({...res[key], id: key})
                //             }
                //         }
                //          return library
                // })
            })
    }


    addReview(userId: number, reviewContent: string) {
        const review: object = { "id": userId, "content": reviewContent }
        const headers = new HttpHeaders({ "myHeader": "bookAppHeader" });
        this.http.post<{ key: number }>(
            `http://localhost:8080/review`,
            review,
            { headers: headers }).subscribe((res) => {
                console.log(res)
                // will send new user object to api based on data procured from the form
            })

    }

    deleteReview(reveiwId: number) {
        const headers = new HttpHeaders

    }

    addBookToUserLibrary(userId: number, book: Book) {

        // TODO: make a ORM class for Book and User

        // Were going to have to create a book model separate from the api return object
        // that represents the fields that the book has in the database to send an object that 
        // won't break everything

        const headers = new HttpHeaders({ "myHeader": "bookAppHeader" });
        this.http.post<{ key: number }>(
            `http://localhost:8080/review`,
            book,
            { headers: headers }).subscribe((res) => {
                console.log(res)
                // will send new user object to api based on data procured from the form
            })
    }

    deleteBookFromUserLibrary() {

    }
}
