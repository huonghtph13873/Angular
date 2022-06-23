import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { PostType } from 'src/app/types/post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  id: string;
  post: PostType;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService

  ) {
    this.id = "";
    this.post = {
      _id: '',
      title: '',
      img: '',
      content: ''
    }
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.postService.getPost(this.id).subscribe((data) => {
      this.post = data;
    })
  }
}
