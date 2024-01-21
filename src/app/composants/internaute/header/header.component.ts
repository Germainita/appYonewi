import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  status: boolean = false;

  clickEvent(){
    this.status = true;       
  }

  clickLink(){
    this.status = true;
    alert("bonjour")
  }

}
