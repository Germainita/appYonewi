import { inject } from "@angular/core"

import { Router } from "@angular/router";

// Guard pour l'admin reseau 
export const AuthGuardAdminReseau = () =>{
    // const auth = inject(AuthService);
    const router = inject(Router);

    // L'administrateur réseau connecté
    const authAdminReseauAccept = JSON.parse(localStorage.getItem("isAdminReseauConnected") || "");

    if(!authAdminReseauAccept){
        router.navigateByUrl('/auth')
        return false;
    } 

    return true;
}

// Guard pour l'administrateur system 
export const AuthGuardAdminSystem =() =>{
    const router = inject(Router);

    // L'administrateur system connecté 
    const authAdminSystemAccept = JSON.parse(localStorage.getItem("isAdminSystemConnected") || "");
    if(!authAdminSystemAccept){
        router.navigateByUrl('/auth')
        return false;
    } 

    return true;
}

// Guard pour le dashbord qui est commun au deux 
export const AuthGuard = () =>{
    // const auth = inject(AuthService);
    const router = inject(Router);

    // L'administrateur réseau connecté
    const authAdminReseauAccept = JSON.parse(localStorage.getItem("isAdminReseauConnected") || "");

    // L'administrateur system connecté 
    const authAdminSystemAccept = JSON.parse(localStorage.getItem("isAdminSystemConnected") || "");

    if(!authAdminReseauAccept && !authAdminSystemAccept){
        router.navigateByUrl('/auth')
        return false;
    } 

    return true;
}

// 778000303