import React from 'react';
import Navbar from '../components/common/Navbar';
import EntryList from '../components/history/EntryList';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../services/store';
import { getAllEntries } from '../services/slices/entrySlice';
import { useEffect } from 'react';

const HistoryPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllEntries());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Historique</h1>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Entrées récentes</h2>
            <div className="flex space-x-2">
              <select className="input-field py-1 px-2 text-sm">
                <option value="all">Toutes les entrées</option>
                <option value="month">Ce mois</option>
                <option value="week">Cette semaine</option>
              </select>
            </div>
          </div>
          
          <EntryList />
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
