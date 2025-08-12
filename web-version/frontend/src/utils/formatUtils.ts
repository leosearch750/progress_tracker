/**
 * Fonctions utilitaires pour le formatage et la manipulation des données
 */

/**
 * Formater un nombre en pourcentage
 * @param value - Valeur à formater (entre 0 et 1)
 * @param decimals - Nombre de décimales
 * @returns Chaîne formatée en pourcentage
 */
export const formatPercent = (value: number, decimals = 0): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Calculer le pourcentage de progression
 * @param current - Valeur actuelle
 * @param total - Valeur totale
 * @returns Pourcentage de progression (entre 0 et 1)
 */
export const calculateProgress = (current: number, total: number): number => {
  if (total <= 0) return 0;
  return Math.min(1, current / total);
};

/**
 * Tronquer une chaîne de caractères si elle dépasse une certaine longueur
 * @param str - Chaîne à tronquer
 * @param maxLength - Longueur maximale
 * @param suffix - Suffixe à ajouter si la chaîne est tronquée
 * @returns Chaîne tronquée
 */
export const truncateString = (str: string, maxLength: number, suffix = '...'): string => {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Grouper un tableau d'objets par une propriété
 * @param array - Tableau d'objets
 * @param key - Clé de regroupement
 * @returns Objet avec les groupes
 */
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
};

/**
 * Générer un ID unique
 * @returns Chaîne représentant un ID unique
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};
