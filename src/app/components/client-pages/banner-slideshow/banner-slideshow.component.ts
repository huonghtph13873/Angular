import { Component, OnInit } from '@angular/core';
import { BannerService } from 'src/app/services/banner.service';
import { BannerType } from 'src/app/types/banner';

@Component({
  selector: 'app-banner-slideshow',
  templateUrl: './banner-slideshow.component.html',
  styleUrls: ['./banner-slideshow.component.css']
})
export class BannerSlideshowComponent implements OnInit {

  banners: BannerType[];

  constructor(private banerService: BannerService) {
    this.banners = [];
  }


  ngOnInit(): void {
    this.onGetList();
  }
  onGetList() {
    this.banerService.getBanners().subscribe((data) => {
      this.banners = data;
    });
  }
}
