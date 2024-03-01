import { Component, OnInit } from '@angular/core';
import { urlImage } from 'src/app/services/apiUrl';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userConnect: string = "";
  imageUserConnected: any;

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem("userConnect")) || "";
    if(user){
      this.userConnect  = user;

    }
    if(user && user.user.image){
      this.imageUserConnected = `${urlImage}${user.user.image}`;
    }
  }   
}