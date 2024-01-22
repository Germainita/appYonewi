import { Component } from '@angular/core';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent {
  // Déclaration des variables 
  isConnexion:boolean = true;
  isRein1: boolean = false;
  isRein2: boolean = false;

  showConnexion(){
    this.isConnexion = true;
    this.isRein1 = false;
    this.isRein2 = false;
  }

  showFirstRein(){
    this.isRein1 = true;
    this.isConnexion = false;
    this.isRein2 = false;
  }

  showSecondRein(){
    this.isRein2 = true;
    this.isRein1 = false;
    this.isConnexion = false;
  }
}
