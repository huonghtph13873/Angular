import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/types/products';

@Component({
  selector: 'app-homepages',
  templateUrl: './homepages.component.html',
  styleUrls: ['./homepages.component.css']
})
export class HomepagesComponent implements OnInit {
  constructor() {
  }
  ngOnInit(): void {

  }
}
