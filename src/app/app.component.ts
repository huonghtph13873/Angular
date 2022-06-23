import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  name = 'tamltph13479';
  class = 'we16301';
  students = [
    {
      name: 'Tam1',
      id: 'PH1',
      status: 0
    },
    {
      name: 'Tam2',
      id: 'PH2',
      status: 0
    },
    {
      name: 'Tam3',
      id: 'PH3',
      status: 1
    }
  ];
  champs = [
    {
      name: 'Lucian',
      dame: 400,
      defend: 200,
      speed: 100,
      price: 6300,
      avatar: 'https://demoda.vn/wp-content/uploads/2022/02/anh-lol-dep-lmht-hinh-nen-lol-cuc-ngau.jpg'
    },
    {
      name: 'Mobeie',
      dame: 10000,
      defend: 200,
      speed: 100,
      price: 500,
      avatar: 'https://demoda.vn/wp-content/uploads/2022/02/anh-lol-dep-lmht-hinh-nen-lol-cuc-ngau.jpg'
    }
  ]
  studentName = 'Le The Tam'
  studentMSV = 'PH13479'
  // Su kien
  showStatus = true;
  onClickBtn() {
    console.log("Btn clicked!")
    this.showStatus = !this.showStatus;

  }
  inputValue = {
    name: '',
    avatar: '',
    dame: '',
    defend: '',
    speed: '',
    price: '',
  };
  onInput(event: any, key: 'name' | 'avatar' | 'speed' | 'dame' | 'defend' | 'price') {
    this.inputValue[key] = event.target.value;
  }

  onSubmit() {
    console.log('Giá trị obj các ô input', this.inputValue);
    // push obj this.input vào mảng champs để thêm 1 dòng dữ liệu mới
    // inputValue sẽ có cấu trúc như obj trong mảng champs
    // cần format lại obj theo đúng cấu trúc dữ liệu trong champs
    this.champs.push({
      ...this.inputValue,
      dame: +this.inputValue.dame,
      defend: +this.inputValue.defend,
      speed: +this.inputValue.speed,
      price: +this.inputValue.price,
    });
    // Gán lại giá trị default cho this.inputValue
    this.inputValue = {
      name: '',
      avatar: '',
      dame: '',
      defend: '',
      speed: '',
      price: '',
    };
  }
}