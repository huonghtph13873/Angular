import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-admin-banner-form',
  templateUrl: './admin-banner-form.component.html',
  styleUrls: ['./admin-banner-form.component.css']
})
export class AdminBannerFormComponent implements OnInit {

  bannerForm: FormGroup;
  bannerId: string;
  constructor(
    private bannerService: BannerService, // cung cấp createProduct
    private router: Router, // cung cấp navigate điều hướng
    private activateRoute: ActivatedRoute,
    private toast: NgToastService// lấy ra các tham số trong url
  ) {
    this.bannerForm = new FormGroup({
      img: new FormControl('', [
        Validators.required,
      ])


    });
    this.bannerId = '0';
  }

  ngOnInit(): void {
    this.bannerId = this.activateRoute.snapshot.params['id'];
    if (this.bannerId) {
      this.bannerService.getbanner(this.bannerId).subscribe(data => {
        // Gán giá trị cho form, patchValue sẽ nhận đầy đủ thuộc tính của form
        this.bannerForm.patchValue({

          img: data.img,


        });
      });
    }
  }

  onSubmit() {
    // 1. Lấy dữ liệu từ form
    const submitData = this.bannerForm.value;

    if (this.bannerId !== '0' && this.bannerId !== undefined) {
      return this.bannerService.updateBanner(this.bannerId, submitData).subscribe(data => {
        this.toast.success({ detail: 'Cập nhập thành công' })

        this.router.navigateByUrl('/admin/banner');
      }, () => {
        this.toast.error({ detail: 'Cập nhập thất bại' })
      });
    }

    // 2. Call API (Cần định nghĩa service và router điều hướng)
    return this.bannerService.createBanner(submitData).subscribe((data) => {
      this.toast.success({ detail: 'Thêm thành công' })

      // 3. Sau khi API call thành công sẽ điều hướng về danh sách
      // this.router.navigate(['/admin', 'products']);
      this.router.navigateByUrl('/admin/banner');
    }, () => {
      this.toast.error({ detail: 'Thêm thất bại' })
    })

  }

}
