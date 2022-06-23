import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { BannerService } from 'src/app/services/banner.service';
import { BannerType } from 'src/app/types/banner';

@Component({
  selector: 'app-admin-banner-list',
  templateUrl: './admin-banner-list.component.html',
  styleUrls: ['./admin-banner-list.component.css']
})
export class AdminBannerListComponent implements OnInit {
  banners: BannerType[];
  constructor(private banerService: BannerService,
    private toast: NgToastService) {
    this.banners = [];
  }

  ngOnInit(): void {
    // với kiểu dữ liệu trả về là Observable thì có phương thức subscribe để lắng nghe
    // bao giờ có kết quả sẽ trả về qua tham số và thực thi tiếp
    this.onGetList();
  }
  onGetList() {
    this.banerService.getBanners().subscribe((data) => {
      this.banners = data;
    });
  }
  onDelete(id: string) {
    // confirm
    const confirmDelete = confirm('Bạn có chắc chắn xoá không?');

    if (confirmDelete && id) {
      // Nếu có id thì xoá -> thực hiện call API xoá
      this.banerService.deleteBanner(id).subscribe((data) => {
        console.log(data); // {}
        this.toast.success({ detail: 'Xóa thành công' })

        // Cập nhật lại dữ liệu mới
        this.onGetList();
      }, () => {
        this.toast.error({ detail: 'Xóa thất bại' })
      }
      )
    }

  }


}
