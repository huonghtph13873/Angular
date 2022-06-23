import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product, ProductCreate } from '../types/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // http sẽ cung cấp các phương thức để tương tác với API
  constructor(private http: HttpClient) { }

  // Observable sẽ cung cấp kiểu xử lý bất đồng bộ để phía component lắng nghe dữ liệu
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.products);
  }
  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.products}/${id}`);
  }
  deleteProduct(id: string | number): Observable<any> {
    return this.http.delete(`${environment.products}/${id}`);
  }
  createProduct(data: ProductCreate): Observable<Product> {
    return this.http.post<Product>(`${environment.products}`, data);
  }

  updateProduct(id: number | string, data: ProductCreate): Observable<Product> {
    return this.http.put<Product>(`${environment.products}/${id}`, data);
  }
}