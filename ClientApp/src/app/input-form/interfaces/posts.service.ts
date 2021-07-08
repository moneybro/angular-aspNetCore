import { Injectable } from '@angular/core';

export interface Post {
  title: string,
  text: string,
  id?: number
}

@Injectable({ providedIn: 'root'})
export class PostsService {
    constructor() {

  }

  posts: Post[] = [
    { title: 'I want to learn angular components', text: 'i learn components 1', id: 1 },
    { title: 'I want to learn asp dotnet core for back', text: 'i learn asp dotnet 2', id: 2 },
    { title: 'I want to work in big company', text: 'Ya starayus 3', id: 3 },
    { title: 'Short post', text: 'korotыshek 4', id: 4 },
  ]

  getAllPosts() {
    return this.posts
  }

  getPostById(id: number) {
    return this.posts.find(p => p.id === id)
  }

}
