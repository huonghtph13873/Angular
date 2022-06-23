import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BannerCreate, BannerType } from '../types/banner';
@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient) {

  }
  getBanners(): Observable<BannerType[]> {
    return this.http.get<BannerType[]>(environment.banners);
  }
  getbanner(id: string): Observable<BannerType> {
    return this.http.get<BannerType>(`${environment.banners}/${id}`);
  }
  deleteBanner(id: string | number): Observable<any> {
    return this.http.delete(`${environment.banners}/${id}`);
  }
  createBanner(data: BannerCreate): Observable<BannerType> {
    return this.http.post<BannerType>(`${environment.banners}`, data);
  }

  updateBanner(id: number | string, data: BannerCreate): Observable<BannerType> {
    return this.http.put<BannerType>(`${environment.banners}/${id}`, data);
  }
}
