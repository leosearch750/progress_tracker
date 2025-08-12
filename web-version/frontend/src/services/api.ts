/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { type AuthCredentials, type RegisterCredentials } from '../types/auth.types';

const API_URL = 'http://localhost:5000/api';

// Créer une instance axios avec configuration de base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token d'authentification aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Services d'authentification
export const authService = {
  // Inscription d'un nouvel utilisateur
  register: async (credentials: RegisterCredentials) => {
    const response = await api.post('/auth/register', credentials);
    return response.data;
  },

  // Connexion d'un utilisateur
  login: async (credentials: AuthCredentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Récupération des données de l'utilisateur connecté
  getCurrentUser: async () => {
    const response = await api.get('/auth/user');
    return response.data;
  },

  // Déconnexion (côté client uniquement)
  logout: () => {
    localStorage.removeItem('token');
  }
};

// Services de gestion des objectifs annuels
export const goalService = {
  // Création ou mise à jour d'un objectif annuel
  createOrUpdateGoal: async (goalData: any) => {
    const response = await api.post('/goals', goalData);
    return response.data;
  },

  // Récupération d'un objectif pour une année spécifique
  getGoalByYear: async (year: number) => {
    const response = await api.get(`/goals/${year}`);
    return response.data;
  }
};

// Services de gestion des entrées quotidiennes
export const entryService = {
  // Création d'une nouvelle entrée
  createEntry: async (entryData: any) => {
    const response = await api.post('/entries', entryData);
    return response.data;
  },

  // Récupération de toutes les entrées
  getAllEntries: async () => {
    const response = await api.get('/entries');
    return response.data;
  },

  // Récupération d'une entrée spécifique
  getEntryById: async (id: string) => {
    const response = await api.get(`/entries/${id}`);
    return response.data;
  },

  // Suppression d'une entrée
  deleteEntry: async (id: string) => {
    const response = await api.delete(`/entries/${id}`);
    return response.data;
  }
};

// Services de gestion des importunités
export const importunityService = {
  // Création d'une nouvelle importunité
  createImportunity: async (importunityData: any) => {
    const response = await api.post('/importunities', importunityData);
    return response.data;
  },

  // Récupération de toutes les importunités
  getAllImportunities: async () => {
    const response = await api.get('/importunities');
    return response.data;
  },

  // Récupération d'une importunité spécifique
  getImportunityById: async (id: string) => {
    const response = await api.get(`/importunities/${id}`);
    return response.data;
  },

  // Mise à jour du compteur d'une importunité
  updateImportunityCounter: async (id: string, counter: number) => {
    const response = await api.put(`/importunities/${id}`, { counter });
    return response.data;
  },

  // Suppression d'une importunité
  deleteImportunity: async (id: string) => {
    const response = await api.delete(`/importunities/${id}`);
    return response.data;
  }
};

export default api;
