export const verifiEmailFunction = (email:string, verifEmail:boolean, verifMessageEmail:string) =>{
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    verifEmail = false;
    if(!email){
      verifMessageEmail = "L'email est obligatoire"
    }else if (email.endsWith("@") || (!email.includes(".")) || (!email.match(emailPattern))){
      verifMessageEmail = "Le format de l'email est incorrect"
    } else{
      verifMessageEmail = "";
      verifEmail = true;
    }
}