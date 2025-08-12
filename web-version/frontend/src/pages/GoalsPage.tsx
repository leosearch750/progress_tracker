/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Navbar from '../components/common/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../services/store';
import { useEffect, useState } from 'react';
import { getGoalByYear, createOrUpdateGoal } from '../services/slices/goalSlice';
import { useForm } from 'react-hook-form';

const GoalsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentGoal, loading, error } = useSelector((state: RootState) => state.goals);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    dispatch(getGoalByYear(currentYear));
  }, [dispatch, currentYear]);

  useEffect(() => {
    if (currentGoal) {
      reset({
        rdTotal: currentGoal.rdTotal,
        lbTotal: currentGoal.lbTotal,
        lcTotal: currentGoal.lcTotal,
        psTotal: currentGoal.psTotal
      });
    } else {
      reset({
        rdTotal: 730, // 2 par jour
        lbTotal: 1189, // Tous les chapitres de la Bible
        lcTotal: 1000, // Pages de littérature chrétienne
        psTotal: 730 // 2h par jour
      });
    }
  }, [currentGoal, reset]);

  const onSubmit = (data: any) => {
    dispatch(createOrUpdateGoal({
      year: currentYear,
      rdTotal: parseInt(data.rdTotal),
      lbTotal: parseInt(data.lbTotal),
      lcTotal: parseInt(data.lcTotal),
      psTotal: parseFloat(data.psTotal)
    }));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentYear(parseInt(e.target.value));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Objectifs annuels</h1>
        
        <div className="card max-w-2xl mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Définir mes objectifs</h2>
            <select 
              className="input-field py-1 px-3"
              value={currentYear}
              onChange={handleYearChange}
            >
              {[...Array(5)].map((_, i) => {
                const year = new Date().getFullYear() - 2 + i;
                return <option key={year} value={year}>{year}</option>;
              })}
            </select>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Rencontres Dynamiques (RD)
                </label>
                <input 
                  type="number" 
                  className="input-field"
                  min="1"
                  {...register('rdTotal', { 
                    required: 'Ce champ est requis',
                    min: { value: 1, message: 'La valeur doit être positive' }
                  })}
                />
                {errors.rdTotal && (
                  <p className="text-red-500 text-xs mt-1">{errors.rdTotal.message as string}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">Recommandé: 730 (2 par jour)</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Lecture Biblique (LB) - Chapitres
                </label>
                <input 
                  type="number" 
                  className="input-field"
                  min="1"
                  {...register('lbTotal', { 
                    required: 'Ce champ est requis',
                    min: { value: 1, message: 'La valeur doit être positive' }
                  })}
                />
                {errors.lbTotal && (
                  <p className="text-red-500 text-xs mt-1">{errors.lbTotal.message as string}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">Recommandé: 1189 (Bible complète)</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Littérature Chrétienne (LC) - Pages
                </label>
                <input 
                  type="number" 
                  className="input-field"
                  min="1"
                  {...register('lcTotal', { 
                    required: 'Ce champ est requis',
                    min: { value: 1, message: 'La valeur doit être positive' }
                  })}
                />
                {errors.lcTotal && (
                  <p className="text-red-500 text-xs mt-1">{errors.lcTotal.message as string}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Prière Seule (PS) - Heures
                </label>
                <input 
                  type="number" 
                  className="input-field"
                  min="0.1"
                  step="0.1"
                  {...register('psTotal', { 
                    required: 'Ce champ est requis',
                    min: { value: 0.1, message: 'La valeur doit être positive' }
                  })}
                />
                {errors.psTotal && (
                  <p className="text-red-500 text-xs mt-1">{errors.psTotal.message as string}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">Recommandé: 730 (2h par jour)</p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                type="submit" 
                className="btn-primary"
                disabled={loading}
              >
                {loading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GoalsPage;
