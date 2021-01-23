import { Component, OnInit } from '@angular/core';
import { promise } from 'protractor';
import { resolve } from 'dns';

export interface Post {
  title: string,
  text: string,
  id?: number
}

@Component({
  selector: 'app-post-parent',
  templateUrl: './post-parent.component.html',
  styleUrls: ['./post-parent.component.scss']
})
export class PostParentComponent implements OnInit {

  search = ''
  searchField = 'title'

  posts: Post[] = [
    { title: 'I want to learn angular components', text: 'i learn components 1', id: 1 },
    { title: 'I want to learn asp dotnet core for back', text: 'i learn asp dotnet 2', id: 2 },
    { title: 'I want to work in big company', text: 'Ya starayus 3', id: 3 },
    { title: 'Short post', text: 'korotыshek 4', id: 4 },
  ]

  maxNum: number = 0

  getNewPostId() {
    this.maxNum = 0
    this.posts.forEach(el => {
      if (el.id > this.maxNum) this.maxNum = el.id
    })
    this.maxNum++
  }

  changePost() {
    setTimeout(() => {
      console.log('timeout')
      this.posts[0] = {
        title: 'changed',
        text: 'changed2',
        id: 33
      }
    }, 3000)
  }

  constructor() { }

  ngOnInit() {
    this.getNewPostId()
    //this.changePost()
  }

  updatePosts(post: Post) {
    this.posts.unshift(post)
    this.getNewPostId()
  }

  removePost(id: number) {
    console.log('post id to remove:', id)
    this.posts = this.posts.filter(p => p.id !== id)
  }

}
