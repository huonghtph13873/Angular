import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private authService: AuthService,
    private router: Router,
    private toast: NgToastService) {
    this.signupForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('', Validators.email),
      password: new FormControl('')
    })
  }

  ngOnInit(): void {
  }
  onSubmit() {
    // 1. Nhận dữ liệu từ form và call API login
    this.authService.signup(this.signupForm.value).subscribe(data => {
      console.log(data);
      this.toast.success({ detail: 'Đăng ký thành công' })
      this.router.navigateByUrl('/auth/signin');
    }, () => {
      this.toast.error({ detail: 'Tên hoặc email đã tồn tại' })
    });
  }
}
