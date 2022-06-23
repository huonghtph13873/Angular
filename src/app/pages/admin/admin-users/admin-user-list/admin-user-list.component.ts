import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { UsersService } from 'src/app/services/users.service';
import { UserType } from 'src/app/types/users';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {

  users: UserType[];
  constructor(private usersService: UsersService,
    private toast: NgToastService) {
    this.users = [];
  }

  ngOnInit(): void {
    // với kiểu dữ liệu trả về là Observable thì có phương thức subscribe để lắng nghe
    // bao giờ có kết quả sẽ trả về qua tham số và thực thi tiếp
    this.onGetList();
  }
  onGetList() {
    this.usersService.getuser().subscribe((data) => {
      this.users = data;
    });
  }
  onDelete(id: string) {
    // confirm
    const confirmDelete = confirm('Bạn có chắc chắn xoá không?');

    if (confirmDelete && id) {
      // Nếu có id thì xoá -> thực hiện call API xoá
      this.usersService.deleteusers(id).subscribe((data) => {
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
