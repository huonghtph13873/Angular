import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { PostType } from 'src/app/types/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: PostType[];
  constructor(private postService: PostService) {
    this.posts = [];
  }

  ngOnInit(): void {
    this.onGetList();
  }
  onGetList() {
    this.postService.getPosts().subscribe((data) => {
      this.posts = data;
      console.log(data)
    });
  }

}
