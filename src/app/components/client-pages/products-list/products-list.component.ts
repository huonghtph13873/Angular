import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/types/products';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[];

  constructor(private productService: ProductService) {
    this.products = [];
  }


  ngOnInit(): void {
    this.onGetList();
  }
  onGetList() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }


}
