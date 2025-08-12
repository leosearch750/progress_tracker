/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../services/store';
import Navbar from '../components/common/Navbar';

const DashboardPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Carte de progression RD */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-2">Rencontres Dynamiques</h2>
            <div className="mb-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <p className="text-sm">45% de l'objectif annuel atteint</p>
            <p className="text-lg font-medium mt-2">90/200</p>
          </div>
          
          {/* Carte de progression LB */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-2">Lecture Biblique</h2>
            <div className="mb-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-secondary h-2.5 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <p className="text-sm">30% de l'objectif annuel atteint</p>
            <p className="text-lg font-medium mt-2">356/1189 chapitres</p>
          </div>
          
          {/* Carte de progression LC */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-2">Littérature Chrétienne</h2>
            <div className="mb-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-accent h-2.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <p className="text-sm">60% de l'objectif annuel atteint</p>
            <p className="text-lg font-medium mt-2">600/1000 pages</p>
          </div>
          
          {/* Carte de progression PS */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-2">Prière Seule</h2>
            <div className="mb-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-light-blue h-2.5 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <p className="text-sm">25% de l'objectif annuel atteint</p>
            <p className="text-lg font-medium mt-2">182/730 heures</p>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activité récente */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Activité récente</h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">Aujourd'hui</p>
                <p className="font-medium">2 RD, 5 chapitres, 10 pages, 1h de prière</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">Hier</p>
                <p className="font-medium">1 RD, 3 chapitres, 15 pages, 0.5h de prière</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">22/05/2025</p>
                <p className="font-medium">2 RD, 4 chapitres, 0 pages, 1h de prière</p>
              </div>
            </div>
          </div>
          
          {/* Importunités récentes */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Importunités récentes</h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="font-medium">Sujet: Famille</p>
                <p className="text-sm">Compteur: 5</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">25/05/2025</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="font-medium">Sujet: Ministère</p>
                <p className="text-sm">Compteur: 3</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">20/05/2025</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="font-medium">Sujet: Santé</p>
                <p className="text-sm">Compteur: 7</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">15/05/2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
