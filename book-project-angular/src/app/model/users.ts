import { Book } from "./book"

export class User {
    id: number
    username: string
    password: string
    books: { favorites: [Book], saved: [Book] }
    // Likely more properties

}