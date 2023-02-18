export interface Post {
    _id: string;
    title: string;
    content: string;
    author: string;
    category: [string];
    createdAt: Date;
}