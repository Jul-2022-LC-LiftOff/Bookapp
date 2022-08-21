import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"


@Injectable({ providedIn: "root" })
export class UserService {

    constructor(private http: HttpClient) {

    }

    // TODO: change header name to title of app 
    // No Duplicate Username Validation
    duplicateCheck(user: { username: string, email: string }) {
        const headers = new HttpHeaders({ "myHeader": "bookAppHeader" });
        this.http.get<{ exists: boolean }>(
            `http://localhost/user/exsist`,
            { headers: headers }).subscribe((res) => {
                console.log(res)
            })
    }

    /* validation method to see if a new user can be created in the table, should
    respond with a simple boolean true or false. To me it makes sense to just send the users username
    and email as those will be the best unique identifiers*/
}