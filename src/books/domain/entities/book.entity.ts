import { Exclude, Expose } from 'class-transformer';

export enum BookStatus {
    PENDING = 'pending',
    READING = 'reading',
    READ = 'read'
}

export type BookId = string;
export type BookTitle = string;
export type BookAuthor = string;
export type BookDescription = string | undefined;
export type BookOwner = string;

export class Book {
    @Exclude() private _id: BookId;
    @Exclude() private _title: BookTitle;
    @Exclude() private _author: BookAuthor;
    @Exclude() private _description: BookDescription;
    @Exclude() private _status: BookStatus;
    @Exclude() private _owner: BookOwner;

    static build (params: {
        id: string,
        title: string,
        author: string,
        description?: string,
        owner: string
    }): Book {
        const book = new Book();

        book.id = params.id;
        book.title = params.title;
        book.author = params.author;
        book.description = params.description;
        book.status = BookStatus.PENDING;
        book.owner = params.owner;

        return book;
    }

    public set id (id: BookId) {
        this._id = id;
    }

    @Expose()
    public get id (): BookId {
        return this._id;
    }

    public set title (title: BookTitle) {
        this._title = title;
    }

    @Expose()
    public get title (): BookTitle {
        return this._title;
    }

    public set author (author: BookAuthor) {
        this._author = author;
    }

    @Expose()
    public get author (): BookAuthor {
        return this._author;
    }

    public set description (description: BookDescription) {
        this._description = description;
    }

    @Expose()
    public get description (): BookDescription {
        return this._description;
    }

    public set status (status: BookStatus) {
        this._status = status;
    }

    @Expose()
    public get status (): BookStatus {
        return this._status;
    }

    public set owner (owner: BookOwner) {
        this._owner = owner;
    }

    @Expose()
    public get owner (): BookOwner {
        return this._owner;
    }
}