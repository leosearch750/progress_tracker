/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fonctions utilitaires pour la validation des données
 */

/**
 * Valider une adresse email
 * @param email - Adresse email à valider
 * @returns true si l'email est valide, false sinon
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valider un mot de passe (au moins 6 caractères, une majuscule, un chiffre)
 * @param password - Mot de passe à valider
 * @returns true si le mot de passe est valide, false sinon
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6 && 
         /[A-Z]/.test(password) && 
         /[0-9]/.test(password);
};

/**
 * Vérifier si une chaîne est vide ou ne contient que des espaces
 * @param str - Chaîne à vérifier
 * @returns true si la chaîne est vide ou ne contient que des espaces, false sinon
 */
export const isEmpty = (str: string | null | undefined): boolean => {
  return !str || str.trim() === '';
};

/**
 * Valider un nombre positif
 * @param value - Valeur à valider
 * @returns true si la valeur est un nombre positif, false sinon
 */
export const isPositiveNumber = (value: any): boolean => {
  const num = Number(value);
  return !isNaN(num) && num > 0;
};

/**
 * Valider un nombre non négatif (zéro ou positif)
 * @param value - Valeur à valider
 * @returns true si la valeur est un nombre non négatif, false sinon
 */
export const isNonNegativeNumber = (value: any): boolean => {
  const num = Number(value);
  return !isNaN(num) && num >= 0;
};
