import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { PostService } from 'src/app/services/post.service';
import { PostType } from 'src/app/types/post';

@Component({
  selector: 'app-admin-post-list',
  templateUrl: './admin-post-list.component.html',
  styleUrls: ['./admin-post-list.component.css']
})
export class AdminPostListComponent implements OnInit {

  posts: PostType[];
  constructor(private postsService: PostService,
    private toast: NgToastService) {
    this.posts = [];
  }

  ngOnInit(): void {
    // với kiểu dữ liệu trả về là Observable thì có phương thức subscribe để lắng nghe
    // bao giờ có kết quả sẽ trả về qua tham số và thực thi tiếp
    this.onGetList();
  }
  onGetList() {
    this.postsService.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }
  onDelete(id: string) {
    // confirm
    const confirmDelete = confirm('Bạn có chắc chắn xoá không?');

    if (confirmDelete && id) {
      // Nếu có id thì xoá -> thực hiện call API xoá
      this.postsService.deletePost(id).subscribe((data) => {
        console.log(data); // {}
        this.toast.success({ detail: 'Xóa thành công' })

        // Cập nhật lại dữ liệu mới
        this.onGetList();
      }, () => {
        this.toast.error({ detail: 'Lỗi' })
      })
    }

  }

}
