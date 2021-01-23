import {
  Component, OnInit, Input, ContentChild, ElementRef, OnChanges,
  SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked,
  Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import { Post } from '../post-parent/post-parent.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class PostComponent implements
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked
{

  @Input() post: Post
  @Output() onRemove = new EventEmitter <number>()
  @ContentChild('info', { static: true }) infoRef: ElementRef

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges', changes)
  }

  ngOnInit() {
    console.log('ngOnInit')
  }

  ngDoCheck() {
    console.log('ngDoCheck')
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit')
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentInit')
  }

  removePost() {
    this.onRemove.emit(this.post.id)
  }
}
