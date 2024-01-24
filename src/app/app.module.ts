import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgApexchartsModule } from "ng-apexcharts";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './composants/internaute/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './composants/internaute/header/header.component';
import { AccueilComponent } from './composants/internaute/accueil/accueil.component';
import { ContactComponent } from './composants/internaute/contact/contact.component';
import { LignesComponent } from './composants/internaute/lignes/lignes.component';
import { PolitiqueComponent } from './composants/internaute/politique/politique.component';
import { ConditionsComponent } from './composants/internaute/conditions/conditions.component';
import { AproposComponent } from './composants/internaute/apropos/apropos.component';
import { AbonnementDDDComponent } from './composants/internaute/abonnement-ddd/abonnement-ddd.component';
import { AbonnementAFTUComponent } from './composants/internaute/abonnement-aftu/abonnement-aftu.component';
import { AuthentificationComponent } from './composants/authentification/authentification.component';
import { SidebarComponent } from './composants/adminSystem/sidebar/sidebar.component';
import { NavbarComponent } from './composants/adminSystem/navbar/navbar.component';
import { DashbordAdminSystemComponent } from './composants/adminSystem/dashbord-admin-system/dashbord-admin-system.component';
import { ReseauComponent } from './composants/adminSystem/reseau/reseau.component';
import { NewsletterComponent } from './composants/adminSystem/newsletter/newsletter.component';
import { MessageComponent } from './composants/adminSystem/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AccueilComponent,
    ContactComponent,
    LignesComponent,
    PolitiqueComponent,
    ConditionsComponent,
    AproposComponent,
    AbonnementDDDComponent,
    AbonnementAFTUComponent,
    AuthentificationComponent,
    SidebarComponent,
    NavbarComponent,
    DashbordAdminSystemComponent,
    ReseauComponent,
    NewsletterComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
