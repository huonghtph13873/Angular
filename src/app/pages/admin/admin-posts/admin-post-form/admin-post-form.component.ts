import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-admin-post-form',
  templateUrl: './admin-post-form.component.html',
  styleUrls: ['./admin-post-form.component.css']
})
export class AdminPostFormComponent implements OnInit {

  postForm: FormGroup;
  postId: string;

  constructor(
    private postService: PostService, // cung cấp createProduct
    private router: Router, // cung cấp navigate điều hướng
    private activateRoute: ActivatedRoute,
    private toast: NgToastService// lấy ra các tham số trong url
  ) {
    this.postForm = new FormGroup({

      title: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),

      ]),
      img: new FormControl('', [
        Validators.required,
      ]),
      content: new FormControl('', [
        Validators.required
      ])

    });
    this.postId = '0';

  }


  ngOnInit(): void {

    this.postId = this.activateRoute.snapshot.params['id'];
    if (this.postId) {
      this.postService.getPost(this.postId).subscribe(data => {
        // Gán giá trị cho form, patchValue sẽ nhận đầy đủ thuộc tính của form
        this.postForm.patchValue({
          title: data.title,
          img: data.img,
          content: data.content,


        });
      });
    }
  }
  onSubmit() {
    // 1. Lấy dữ liệu từ form
    const submitData = this.postForm.value;

    if (this.postId !== '0' && this.postId !== undefined) {
      return this.postService.updatePostt(this.postId, submitData).subscribe(data => {
        this.toast.success({ detail: 'Cập nhập thành công' })

        this.router.navigateByUrl('/admin/post');
      }, () => {
        this.toast.error({ detail: 'Cập nhập thất bại' })
      });
    }

    // 2. Call API (Cần định nghĩa service và router điều hướng)
    return this.postService.createPost(submitData).subscribe((data) => {
      this.toast.success({ detail: 'Thêm thành công' })

      // 3. Sau khi API call thành công sẽ điều hướng về danh sách
      // this.router.navigate(['/admin', 'products']);
      this.router.navigateByUrl('/admin/post');
    }, () => {
      this.toast.error({ detail: 'Thêm thất bại' })
    })

  }

}
