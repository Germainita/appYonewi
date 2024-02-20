import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { sweetAlertMessage } from 'src/app/services/sweetAlert/alert.service';
import { validateEmail, validateField, validateLengthField, validateName } from 'src/app/validation/validation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  // Déclaration des variables 
  contact = new Contact;

  // Déclaration des methodes 
  // Injection du service Contact 
  constructor(private contactService: ContactService){}

  ngOnInit(): void {
    
  }

  emailMessage : string = "";
  isEmailValid: boolean = false;
  // Vérification de l'email 
  verifEmailFunction(email: any){
    this.emailMessage = "";
    this.isEmailValid = validateEmail(email);
    if(!email){
      this.emailMessage = "L'email est obligatoire"
    }else if(!this.isEmailValid){
      this.emailMessage = "Le format de l'email est incorrect";
    } else{
      this.emailMessage = "";
      this.isEmailValid = true;
    }
  }

  isSujet: boolean = false;
  sujetMessage : string  = "";
  // Véfification du sujet 
  verifSujetFunction(sujet:any){
    this.sujetMessage = "";

    let sujetLengthvalidate = validateLengthField(sujet, 4)
    let sujetFormatValidate = validateField(sujet);
    if(!sujet){
      this.sujetMessage = "Le sujet est obligatoire";
    } else if(!sujetFormatValidate){
      this.sujetMessage = "Ce champ ne doit pas commencer par un espace.";
    } else if (!sujetLengthvalidate) {
      this.sujetMessage = "La longueur doit être supérieur ou égale à 4";
    }
    else {
      this.sujetMessage = "";
      this.isSujet = true;
    }
  }

  isMessage: boolean = false;
  messageMessage : string  = "";
  // Véfification du message 
  verifMessageFunction(message:any){
    this.messageMessage = "";

    let messageLengthvalidate = validateLengthField(message, 10)
    let messageFormatValidate = validateField(message);
    if(!message){
      this.messageMessage = "Le message est obligatoire";
    }else if(!messageFormatValidate){
      this.messageMessage = "Ce champ ne doit pas commencer par un espace.";
    }
    else if (!messageLengthvalidate) {
      this.messageMessage = "La longueur doit être supérieur ou égale à 10";
    }
    else {
      this.messageMessage = "";
      this.isMessage = true;
    }
  }

  // Methode pour ajouter un contact 
  addContact(){
    // On ajoute le contact 
    let contactObjet = {
      email: this.contact.email,
      sujet: this.contact.sujet,
      contenu: this.contact.contenu
    }

    // console.log(contact);
    // On insère le contact dans la base de donnée 
    this.contactService.addContact(contactObjet).subscribe(
      (data:any) =>{
        console.log(`Succes \n${data}`);
        console.log(data);
        
        sweetAlertMessage("success", "", data.message);

        // On vide les champs 
        this.contact.email = "";
        this.contact.sujet = "";
        this.contact.contenu = "";
        
      },
      (err:any) =>{
        console.log(`erreur \n${err}`);
        console.log(err);
        if(err.error.erros.sujet){
          this.sujetMessage = err.error.erros.sujet[0];
        }
        if(err.error.erros.contenu){
          this.messageMessage = err.error.erros.contenu[0];
        }
        
      }
    )
  }

}
