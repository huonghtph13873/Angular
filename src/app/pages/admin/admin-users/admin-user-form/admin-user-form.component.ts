import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-user-form',
  templateUrl: './admin-user-form.component.html',
  styleUrls: ['./admin-user-form.component.css']
})
export class AdminUserFormComponent implements OnInit {
  userForm: FormGroup;
  userId: string;

  constructor(
    private userService: UsersService, // cung cấp createProduct
    private router: Router, // cung cấp navigate điều hướng
    private activateRoute: ActivatedRoute,
    private toast: NgToastService
    // lấy ra các tham số trong url
  ) {
    this.userForm = new FormGroup({

      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),

      ]),
      email: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      role: new FormControl(0, [

      ]),

    });
    this.userId = '0';

  }


  ngOnInit(): void {

    this.userId = this.activateRoute.snapshot.params['id'];
    if (this.userId) {
      this.userService.getusers(this.userId).subscribe(data => {
        // Gán giá trị cho form, patchValue sẽ nhận đầy đủ thuộc tính của form
        this.userForm.patchValue({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,


        });
      });
    }
  }
  onSubmit() {
    // 1. Lấy dữ liệu từ form
    const submitData = this.userForm.value;

    if (this.userId !== '0' && this.userId !== undefined) {
      return this.userService.updateusers(this.userId, submitData).subscribe(data => {
        this.toast.success({ detail: 'dang ky thanh cong' })

        this.router.navigateByUrl('/admin/user');
      }, () => {
        this.toast.error({ detail: 'Tên hoặc email k tồn tại' })
      });
    }

    // 2. Call API (Cần định nghĩa service và router điều hướng)
    return this.userService.createusers(submitData).subscribe((data) => {
      this.toast.success({ detail: 'dang ky thanh cong' })

      // this.router.navigate(['/admin', 'products']);
      this.router.navigateByUrl('/admin/user');
    }, () => {
      this.toast.error({ detail: 'Tên hoặc email k tồn tại' })
    }


    )

  }

}
