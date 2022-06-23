import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/types/products';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id: string;
  product: Product;
  cartValue: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private lsService: LocalStorageService,// dùng để lấy các phương thức xử lý ls
    private toast: NgToastService
  ) {
    this.id = "";
    this.product = {
      _id: '',
      name: "",
      img: '',
      price: 0,
      description: ''
    }
    this.cartValue = 1;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.productService.getProduct(this.id).subscribe((data) => {
      this.product = data;
    })
  }
  onChangeCartValue(event: any) {
    this.cartValue = event.target.value;
  }

  onAddToCart() {
    // Định nghĩa 1 sp trong giỏ hàng có cấu trúc là gì
    const addItem = {
      ...this.product,
      value: +this.cartValue
    };
    this.lsService.setItem(addItem);
    this.cartValue = 1;
    this.toast.success({ detail: 'Dat mua thanh cong' })

  }
}
