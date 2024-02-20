// Vérification de l'email 
export const validateEmail = (email: string): boolean =>{
  const emailRegex=/^[A-Za-z]+[A-Za-z0-9\._%+-]+@+[A-Za-z][A-Za-z0-9\.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}

// Vérification de la longueur des noms des champs 
export const validateLengthField = (field: string, long:number): boolean =>{
  let verif: boolean = false
  if (field && (field.length >= long)) {
    verif = true ;
  }
  return verif;
}

// Vérification du nom de la ligne 
export const validateLigneName = (ligne: string): boolean =>{
  const nomLigneRegex = /^[1-9]/;
  return nomLigneRegex.test(ligne);
}

// Vérification  du format de mot de passe  
export const validatePassword = (password: string): boolean =>{
  const passwordRegex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return passwordRegex.test(password);
}

// Vérification  du format du nom et du prénom  
export const validateName = (name: string): boolean =>{
  const nameRegex=/^[a-zA-Z][a-zA-Z -]{1,100}$/;
  return nameRegex.test(name);
}

// Vérification  du format du telephone  
export const validatePhone = (phone: string): boolean =>{
  const phoneRegex=/^(77|78|76|70|75|33)[0-9]{7}$/;
  return phoneRegex.test(phone);
}

// Vérification  du format des autres champs qui ne doivent pas commencer par un espace 
export const validateField = (name: string): boolean =>{
  const nameRegex=/^[a-zA-Z]/;
  return nameRegex.test(name);
}