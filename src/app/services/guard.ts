import { inject } from "@angular/core"
import { AuthService } from "./auth.service"
import { Router } from "@angular/router";

export const AuthGuard = () =>{
    // const auth = inject(AuthService);
    const router = inject(Router);

    const authAccept = JSON.parse(localStorage.getItem("isUserConnected"));
    if(!authAccept){
        router.navigateByUrl('/accueil')
        return false;
    }
    // if(!auth.isAuthenticated){
    //     router.navigateByUrl('/accueil')
    //     return false;
    // }

    return true;
}