import { Component, OnInit } from '@angular/core';
import { Newsletter } from 'src/app/models/newsletter.model';
import { NewsletterService } from 'src/app/services/newsletter.service';
import { sweetAlertMessage } from 'src/app/services/sweetAlert/alert.service';
import { validateEmail } from 'src/app/validation/validation';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
  // Déclaration des variables 
  newsletterObjet = new Newsletter;

  // const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
  //   if(!this.contact.email || !this.contact.sujet|| !this.contact.contenu){
  //     sweetAlertMessage("error", "", "Veuillez remplir les informations demandées");
  //   } else if (!this.contact.email.match(emailPattern) || this.contact.email.endsWith("@") || !this.contact.email.includes(".")) { 
  //     // On vérifie si le format de l'email est correcte
  //     sweetAlertMessage("error", "", "Veuillez saisir un email valide");
  //   } else{

  // Declaration des methodes
  constructor(private newsLetterService: NewsletterService){} 
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

  newsletterInscription(){
    this.verifEmailFunction (this.newsletterObjet.email);
    
    if(this.isEmailValid){
      this.newsLetterService.inscriptionNewsletter(this.newsletterObjet).subscribe(
        (resp:any) =>{
          console.log(resp);
          sweetAlertMessage("success", "", resp.message);
          this.newsletterObjet.email = "";
        },
        (err) =>{
          console.log(err);
          this.emailMessage  = err.error.message;
          // sweetAlertMessage("error", "", err.error.message);
        }
      )
    }
  }
}
