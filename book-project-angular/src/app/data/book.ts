export class Book {
    id: number
    title: string
    authors: [string]
    publisher: string
    publishedDate: string
    description: string
    industryIdentifiers: [{ type: string, identifier: string }]
    readingModels: { text: boolean, image: boolean }
    pageCount: number
    printType: string
    catagories: [string]
    averageRating: number
    ratingsCount: number
    maturityRating: string
    allowAnonLogging: boolean
    contentVersion: string
    panelizationSummary: { containsEpubBubbles: boolean, containsImageBubbles: boolean }
    imageLinks: {
        smallThumbnail?: string,
        thumbnail: string,
        small: string,
        medium: string,
        large: string,
        extraLarge: string
    }
    language: string
    previewLink: string
    infoLink: string
    canonicalVolumeLink: string
}