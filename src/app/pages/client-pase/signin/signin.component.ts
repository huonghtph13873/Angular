import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {

    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('')
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // 1. Nhận dữ liệu từ form và call API login
    this.authService.login(this.loginForm.value).subscribe(data => {
      this.toast.success({ detail: 'Đăng nhập thành công' })
      // 2. Lưu thông tin user vào localStorage: setItem(tên key lưu vào ls, dữ liệu string)
      localStorage.setItem('loggedInUser', JSON.stringify(data));

      setTimeout(() => {
        this.router.navigateByUrl('/admin/products');
      }, 1000)

    }, () => {
      this.toast.error({ detail: 'Email hoặc mật khẩu không đúng '})
    });
  }
}
