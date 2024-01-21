import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './composants/internaute/accueil/accueil.component';
import { AproposComponent } from './composants/internaute/apropos/apropos.component';
import { ContactComponent } from './composants/internaute/contact/contact.component';
import { LignesComponent } from './composants/internaute/lignes/lignes.component';
import { AbonnementAFTUComponent } from './composants/internaute/abonnement-aftu/abonnement-aftu.component';
import { AbonnementDDDComponent } from './composants/internaute/abonnement-ddd/abonnement-ddd.component';

const routes: Routes = [
  // Route par défaut 
  {path: "", redirectTo: "/accueil", pathMatch: 'full'},

  // Les routes pour l'internaute 
  {path: "accueil", component: AccueilComponent},
  {path: "apropos", component: AproposComponent},
  {path: "contact", component: ContactComponent},
  {path: "lignes", component: LignesComponent},
  {path: "reseauAftu", component: AbonnementAFTUComponent},
  {path: "reseauDDD", component: AbonnementDDDComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
