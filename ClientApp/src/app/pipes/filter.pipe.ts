import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../post-parent/post-parent.component';

@Pipe({
  name: 'filter',
  pure: false // ухудшает оптимизацию пайпов
})
export class FilterPipe implements PipeTransform {

  transform(posts: Post[], search: string = '', field: string=''): Post[] {
    if (!search.trim()) {
      return posts
    }
    return posts.filter(post => {
      return post[field].toLowerCase().includes(search.toLowerCase())
    })
  }

}
