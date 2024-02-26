export interface UserInt {
    [key: string]: number | string;
    id: number,
    name: string,
    email: string
    gender: string,
    status: string
}

export interface PostInt {
    [key: string]: number | string;
    id: number,
    user_id: number,
    title: string,
    body: string
}

export interface CommentInt {
    [key: string]: number | string;
    id: number,
    post_id: number,
    name: string,
    email: string,
    body: string
}

export interface ErrorFromGoRestApi {
    [key: string]: number | string | object | boolean;
    error: [{ message: string, field: string }],
    headers: object,
    message: string,
    name: string,
    ok: boolean,
    status: number,
    statusText: string
    url: string
}

export class User implements UserInt {
    [key: string]: number | string;
    id: number = 0;
    name: string = '';
    email: string = '';
    gender: string = '';
    status: string = '';
}

export class Post implements PostInt {
    [key: string]: number | string;
    id: number = 0;
    user_id: number = 0;
    title: string = '';
    body: string = '';
}

export class Comment implements CommentInt {
    [key: string]: number | string;
    id: number = 0;
    post_id: number = 0;
    name: string = '';
    email: string = '';
    body: string = '';
}