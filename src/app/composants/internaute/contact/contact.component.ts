import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { sweetAlertMessage } from 'src/app/services/sweetAlert/alert.service';

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
  // Methode pour ajouter un contact 
  addContact(){
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    if(!this.contact.email || !this.contact.sujet|| !this.contact.contenu){
      sweetAlertMessage("error", "", "Veuillez remplir les informations demandées");
    } else if (!this.contact.email.match(emailPattern) || this.contact.email.endsWith("@") || !this.contact.email.includes(".")) { 
      // On vérifie si le format de l'email est correcte
      sweetAlertMessage("error", "", "Veuillez saisir un email valide");
    } else{
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
          sweetAlertMessage("success", "", "Message enregistré avec succès");

          // On vide les champs 
          this.contact.email = "";
          this.contact.sujet = "";
          this.contact.contenu = "";
          
        },
        (err:any) =>{
          console.log(`erreur \n${err}`);
          
        }
      )
    }
  }

  // const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
  //   this.exactEmailCon = false;

  //   if(this.emailCon == ""){
  //     this.verifEmailCon = "Veuillez renseigner votre email";
  //   }
  //   else if (!this.emailCon.match(emailPattern) ){
  //     this.verifEmailCon = "Veuillez donner un email valide";
  //   }
  //   else {
  //     this.verifEmailCon = "";
  //     this.exactEmailCon = true;
  //   }
  // }

}
