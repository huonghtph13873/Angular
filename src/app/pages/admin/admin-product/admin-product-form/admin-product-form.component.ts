import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { CategoryType } from 'src/app/types/category';
@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css']
})
export class AdminProductFormComponent implements OnInit {
  productForm: FormGroup;
  productId: string;
  constructor(
    private productService: ProductService, // cung cấp createProduct
    private router: Router, // cung cấp navigate điều hướng
    private activateRoute: ActivatedRoute,// lấy ra các tham số trong url
    private categoryService: CategoryService,
    private toast: NgToastService
  ) {
    this.productForm = new FormGroup({

      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),

      ]),
      img: new FormControl('', [
        Validators.required,
      ]),
      price: new FormControl(0, [
        Validators.required,


      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),
      ]),
      category: new FormControl('', [
      ]),

    });
    this.productId = '0';
    
  }

  
  ngOnInit(): void {
    
  }
  onValidateNameHasProduct(control: AbstractControl): ValidationErrors | null {
    // 1. Lấy ra value của FormControl name hiện tại
    const { value } = control; // value = control.value;
    // 2. Kiểm tra theo điều kiện chứa từ khoá 'product'
    if (!value.includes('product')) {
      return { hasProductError: true };
    }
    // 3. trả về kq nếu không lỗi
    return null;
  }
  onSubmit() {
    // 1. Lấy dữ liệu từ form
    const submitData = this.productForm.value;

    if (this.productId !== '0' && this.productId !== undefined) {
      return this.productService.updateProduct(this.productId, submitData).subscribe(data => {
        this.toast.success({ detail: 'Cập nhập thành công' })

        this.router.navigateByUrl('/admin/products');
      }, () => {
        this.toast.error({ detail: 'Cập nhập lỗi' })
      });
    }

    // 2. Call API (Cần định nghĩa service và router điều hướng)
    return this.productService.createProduct(submitData).subscribe((data) => {
      this.toast.success({ detail: 'Thêm thành công' })

      // 3. Sau khi API call thành công sẽ điều hướng về danh sách
      // this.router.navigate(['/admin', 'products']);
      this.router.navigateByUrl('/admin/products');
    }, () => {
      this.toast.error({ detail: 'Thêm thất bại' })
    })

  }
}
