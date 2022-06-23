import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostCreate, PostType } from '../types/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  getPosts(): Observable<PostType[]> {
    return this.http.get<PostType[]>(environment.posts);
  }
  getPost(id: string): Observable<PostType> {
    return this.http.get<PostType>(`${environment.posts}/${id}`);
  }
  deletePost(id: string | number): Observable<any> {
    return this.http.delete(`${environment.posts}/${id}`);
  }
  createPost(data: PostCreate): Observable<PostType> {
    return this.http.post<PostType>(`${environment.posts}`, data);
  }

  updatePostt(id: number | string, data: PostCreate): Observable<PostType> {
    return this.http.put<PostType>(`${environment.posts}/${id}`, data);
  }
}
