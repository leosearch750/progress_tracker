/**
 * Fonctions utilitaires pour la manipulation des dates
 */

/**
 * Formater une date en chaîne de caractères selon le format français
 * @param date - Date à formater
 * @param includeTime - Inclure l'heure dans le format
 * @returns Chaîne de caractères formatée
 */
export const formatDate = (date: Date | string, includeTime = false): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...(includeTime ? { hour: '2-digit', minute: '2-digit' } : {})
  };
  
  return d.toLocaleDateString('fr-FR', options);
};

/**
 * Obtenir la date du jour au format YYYY-MM-DD
 * @returns Chaîne de caractères représentant la date du jour
 */
export const getTodayString = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * Vérifier si deux dates sont le même jour
 * @param date1 - Première date
 * @param date2 - Deuxième date
 * @returns true si les dates sont le même jour, false sinon
 */
export const isSameDay = (date1: Date | string, date2: Date | string): boolean => {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
  
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

/**
 * Obtenir le premier jour de la semaine (lundi) pour une date donnée
 * @param date - Date de référence
 * @returns Date correspondant au lundi de la semaine
 */
export const getFirstDayOfWeek = (date: Date | string): Date => {
  const d = typeof date === 'string' ? new Date(date) : new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Ajuster pour que le premier jour soit lundi
  
  return new Date(d.setDate(diff));
};

/**
 * Obtenir le premier jour du mois pour une date donnée
 * @param date - Date de référence
 * @returns Date correspondant au premier jour du mois
 */
export const getFirstDayOfMonth = (date: Date | string): Date => {
  const d = typeof date === 'string' ? new Date(date) : new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), 1);
};

/**
 * Obtenir le dernier jour du mois pour une date donnée
 * @param date - Date de référence
 * @returns Date correspondant au dernier jour du mois
 */
export const getLastDayOfMonth = (date: Date | string): Date => {
  const d = typeof date === 'string' ? new Date(date) : new Date(date);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
};
