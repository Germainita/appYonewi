// Vérification de l'email 
export const validateEmail = (email: string): boolean =>{
  const emailRegex=/^[A-Za-z]+[A-Za-z0-9\._%+-]+@[A-Za-z0-9\.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}

// Vérification de la longueur des noms des champs 
export const validateLengthField = (field: string): boolean =>{
  return (field.length >= 2);
}