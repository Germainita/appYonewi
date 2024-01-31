import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './composants/internaute/accueil/accueil.component';
import { AproposComponent } from './composants/internaute/apropos/apropos.component';
import { ContactComponent } from './composants/internaute/contact/contact.component';
import { LignesComponent } from './composants/internaute/lignes/lignes.component';
import { AbonnementAFTUComponent } from './composants/internaute/abonnement-aftu/abonnement-aftu.component';
import { AbonnementDDDComponent } from './composants/internaute/abonnement-ddd/abonnement-ddd.component';
import { AuthentificationComponent } from './composants/commun/authentification/authentification.component';
import { PolitiqueComponent } from './composants/internaute/politique/politique.component';
import { ConditionsComponent } from './composants/internaute/conditions/conditions.component';
import { DashbordComponent } from './composants/commun/dashbord/dashbord.component';
import { UtilisateurComponent } from './composants/adminSystem/utilisateur/utilisateur.component';
import { ReseauComponent } from './composants/adminSystem/reseau/reseau.component';
import { RoleComponent } from './composants/adminSystem/role/role.component';
import { NewsletterComponent } from './composants/adminSystem/newsletter/newsletter.component';
import { MessageComponent } from './composants/adminSystem/message/message.component';
import { TarifComponent } from './composants/adminReseau/tarif/tarif.component';
import { AbonnementComponent } from './composants/adminReseau/abonnement/abonnement.component';
import { GestionLigneComponent } from './composants/adminReseau/gestion-ligne/gestion-ligne.component';
import { AuthGuard } from './services/guard';
import { TypeLigneComponent } from './composants/adminReseau/type-ligne/type-ligne.component';

const routes: Routes = [
  // Route par défaut 
  {path: "", redirectTo: "/accueil", pathMatch: 'full'},

  // Les routes pour l'internaute 
  {path: "accueil", component: AccueilComponent, title:"Accueil"},
  {path: "apropos", component: AproposComponent, title: "A propos"},
  {path: "contact", component: ContactComponent, title: "Contact"},
  {path: "lignes", component: LignesComponent, title: "Lignes"},
  {path: "reseauAftu", component: AbonnementAFTUComponent, title: "Reseau AFTU"},
  {path: "reseauDDD", component: AbonnementDDDComponent, title: "Reseau DDD"},
  {path: "politiques", component: PolitiqueComponent, title: "politiques de confidentialité"},
  {path: "conditions", component: ConditionsComponent, title: "Condition d'utilisation"},

  // L'authentification 
  {path: "auth", component: AuthentificationComponent},

  // Pour les admins 
  {path: "dashbord", component: DashbordComponent, title: "Dashbord", canActivate: [AuthGuard]},

  // Pour l'administrateur system 
  {path: "reseau", component:ReseauComponent, title: "Gestion reseau", canActivate: [AuthGuard]}, //Fait
  {path: "role", component:RoleComponent, title: "Gestion role", canActivate: [AuthGuard]}, //Fait 
  {path: "utilisateur", component:UtilisateurComponent, title: "Gestion utilisateur", canActivate: [AuthGuard]}, //Fait
  {path: "newsletter", component:NewsletterComponent, title: "Gestion newsletter", canActivate: [AuthGuard]}, //Fait
  {path: "message", component:MessageComponent, title: "Gestion message", canActivate: [AuthGuard]}, //Fait
  

  // Pour les administrateurs réseau 
  // {path: "gestionTarifs", component:TarifComponent, title: "Gestion tarifs", canActivate: [AuthGuard]},
  {path: "gestionTarifs", component:TarifComponent, title: "Gestion tarifs"}, // En cours
  {path: "gestionTypeLigne", component:TypeLigneComponent, title: "Gestion type ligne", canActivate: [AuthGuard]}, //Fait
  {path: "gestionLigne", component:GestionLigneComponent, title: "Gestion lignes", canActivate: [AuthGuard]},
  // {path: "gestionAbonnemenet", component:AbonnementComponent, title: "Gestion abonnement", canActivate: [AuthGuard]}, //Fait
  {path: "gestionAbonnemenet", component:AbonnementComponent, title: "Gestion abonnement"}, // En cours
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
