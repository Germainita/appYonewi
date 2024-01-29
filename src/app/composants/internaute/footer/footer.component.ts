import { Component, OnInit } from '@angular/core';
import { Newsletter } from 'src/app/models/newsletter.model';
import { NewsletterService } from 'src/app/services/newsletter.service';
import { sweetAlertMessage } from 'src/app/services/sweetAlert/alert.service';

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

  newsletterInscription(){
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    if(!this.newsletterObjet.email){
      sweetAlertMessage("error", "", "Veuillez saisir votre adresse email");
    } else if (!this.newsletterObjet.email.match(emailPattern) || this.newsletterObjet.email.endsWith("@") || !this.newsletterObjet.email.includes(".")){
      sweetAlertMessage("error", "", "Veuillez saisir un email valide");
    } else{
      // On ajoute dans la base de données
      // On vérifie d'abord s'il n'existe pas 
      // let newsletterExist
      this.newsLetterService.inscriptionNewsletter(this.newsletterObjet).subscribe(
        (resp) =>{
          console.log(resp);
          sweetAlertMessage("success", "", "Vous maintenant inscrit à la newsletter");
          this.newsletterObjet.email = "";
        },
        (err) =>{
          console.log(err);
        }
      )
    }
  }
}
