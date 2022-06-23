import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryCreate, CategoryType } from '../types/category';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  getCategorys(): Observable<CategoryType[]> {
    return this.http.get<CategoryType[]>(environment.categorys);
  }
  getCategory(id: string): Observable<CategoryType> {
    return this.http.get<CategoryType>(`${environment.categorys}/edit/${id}`);
  }
  getCategoryseach(id: string): Observable<CategoryType> {
    return this.http.get<CategoryType>(`${environment.categorys}/${id}`);
  }
  deleteCategory(id: string | number): Observable<any> {
    return this.http.delete(`${environment.categorys}/${id}`);
  }
  createCategory(data: CategoryCreate): Observable<CategoryType> {
    return this.http.post<CategoryType>(`${environment.categorys}`, data);
  }
  updateCategory(id: number | string, data: CategoryCreate): Observable<CategoryType> {
    return this.http.put<CategoryType>(`${environment.categorys}/${id}`, data);
  }
}
