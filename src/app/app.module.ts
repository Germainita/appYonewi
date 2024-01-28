import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgApexchartsModule } from "ng-apexcharts";

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

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
import { AuthentificationComponent } from './composants/commun/authentification/authentification.component';
import { SidebarComponent } from './composants/commun/sidebar/sidebar.component';
import { NavbarComponent } from './composants/commun/navbar/navbar.component';
import { DashbordAdminSystemComponent } from './composants/adminSystem/dashbord-admin-system/dashbord-admin-system.component';
import { ReseauComponent } from './composants/adminSystem/reseau/reseau.component';
import { NewsletterComponent } from './composants/adminSystem/newsletter/newsletter.component';
import { MessageComponent } from './composants/adminSystem/message/message.component';
import { RoleComponent } from './composants/adminSystem/role/role.component';
import { UtilisateurComponent } from './composants/adminSystem/utilisateur/utilisateur.component';
import { StatisticsComponent } from './composants/commun/statistics/statistics.component';
import { DashbordComponent } from './composants/commun/dashbord/dashbord.component';
import { TarifComponent } from './composants/adminReseau/tarif/tarif.component';
import { AbonnementComponent } from './composants/adminReseau/abonnement/abonnement.component';
import { GestionLigneComponent } from './composants/adminReseau/gestion-ligne/gestion-ligne.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/interceptor';

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
    MessageComponent,
    RoleComponent,
    UtilisateurComponent,
    StatisticsComponent,
    DashbordComponent,
    TarifComponent,
    AbonnementComponent,
    GestionLigneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgApexchartsModule,
    HttpClientModule
  ],
  providers: [
    AuthService, 
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
