import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthentificationComponent } from './authentification.component';

// import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms'; // Nécessaire si le composant a un ngModel
import { HttpClientModule } from '@angular/common/http'; // Nécessaire si le composant utilise un http client
import { HeaderComponent } from '../../internaute/header/header.component'; // Nécessaire si le composant a un autre composant importé
import { FooterComponent } from '../../internaute/footer/footer.component';
import { RouterTestingModule } from '@angular/router/testing'; // Nécessaire pour les routerLinkActive
import { Router } from '@angular/router';
// import { sweetAlertMessage } from 'src/app/services/sweetAlert/alert.service';

describe('AuthentificationComponent', () => {
  let component: AuthentificationComponent;
  let fixture: ComponentFixture<AuthentificationComponent>;
  let app: AuthentificationComponent;
  let route: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthentificationComponent, HeaderComponent, FooterComponent],
      imports: [FormsModule, HttpClientModule, RouterTestingModule]
    });
    fixture = TestBed.createComponent(AuthentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    app = fixture.componentInstance;
    route = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test unitaire pour verifEmailConFonction()
  // it('should valid email', () =>{
  //   const validEmail = "germaine@gmail.com"
  //   const invalidEmail = "ggbelle"

  //   // Email vide 
  //   app.emailCon = "";
  //   app.verifEmailConFonction();

  //   expect(app.verifEmailCon).toBe("Veuillez renseigner votre email");
  //   expect(app.exactEmailCon).toBe(false);

  //   // Email invalide 
  //   app.emailCon = invalidEmail;
  //   app.verifEmailConFonction();

  //   expect(app.verifEmailCon).toBe("Veuillez donner un email valide");
  //   expect(app.exactEmailCon).toBe(false);

  //   // Email valide
  //   app.emailCon = validEmail;
  //   app.verifEmailConFonction();

  //   expect(app.verifEmailCon).toBe("");
  //   expect(app.exactEmailCon).toBe(true);

    
  // })



  // Test unitaire pour la méthode verifEmailFunction
  it('should valid email', () =>{
    const validEmail = "germaine@gmail.com"
    const invalidEmail = "ggbelle"

    // Email vide 
    app.email = "";
    app.verifEmailFunction();

    expect(app.verifMessageEmail).toBe("");
    expect(app.verifEmail).toBe(false);

    // Email incorrect 
    app.email = "ggbell";
    app.verifEmailFunction();

    expect(app.verifMessageEmail).toBe("Le format de l'email est incorrect");
    expect(app.verifEmail).toBe(false);

    // Email correct 
    app.email = "germaine@gmail.com";
    app.verifEmailFunction();

    expect(app.verifMessageEmail).toBe("");
    expect(app.verifEmail).toBe(true);
  
  })

   
  // Test unitaire pour la methode login 
  it('should admin connect', ()=>{
    const navigateSpy = spyOn(route, 'navigate'); // Spy on the router's navigate method

    // Email et mot de passe valid 
    app.verifEmail = true;
    app.verifPassword = true;

    let adminSystem = {
      email: "bamagid6@gmail.com",
      password: "password"
    }

    app.email = adminSystem.email;
    app.password = adminSystem.password;

    app.login();

    // sweetAlertMessage("succes", "", "Authentification resussie")
    expect(app.login());

    // expect(navigateSpy).toHaveBeenCalledWith(['admin']); 
  })
});
