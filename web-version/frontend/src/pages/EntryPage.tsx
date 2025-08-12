/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../components/common/Navbar';

const EntryPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    // Cette fonction sera implémentée plus tard pour envoyer les données au backend
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Saisie quotidienne</h1>
        
        <div className="card max-w-3xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Date</label>
              <input 
                type="date" 
                className="input-field"
                {...register('date', { required: 'La date est requise' })}
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">{errors.date.message as string}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Rencontres Dynamiques (RD)</label>
                <div className="flex items-center">
                  <input 
                    type="number" 
                    className="input-field"
                    min="0"
                    {...register('rdCompleted', { 
                      required: 'Ce champ est requis',
                      min: { value: 0, message: 'La valeur doit être positive' }
                    })}
                  />
                  <span className="mx-2">/</span>
                  <input 
                    type="number" 
                    className="input-field"
                    min="0"
                    {...register('rdTarget', { 
                      required: 'Ce champ est requis',
                      min: { value: 0, message: 'La valeur doit être positive' }
                    })}
                  />
                </div>
                {errors.rdCompleted && (
                  <p className="text-red-500 text-xs mt-1">{errors.rdCompleted.message as string}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Prière Seule (PS) en heures</label>
                <div className="flex items-center">
                  <input 
                    type="number" 
                    className="input-field"
                    step="0.1"
                    min="0"
                    {...register('psHours', { 
                      required: 'Ce champ est requis',
                      min: { value: 0, message: 'La valeur doit être positive' }
                    })}
                  />
                  <span className="mx-2">/</span>
                  <input 
                    type="number" 
                    className="input-field"
                    step="0.1"
                    min="0"
                    {...register('psTarget', { 
                      required: 'Ce champ est requis',
                      min: { value: 0, message: 'La valeur doit être positive' }
                    })}
                  />
                </div>
                {errors.psHours && (
                  <p className="text-red-500 text-xs mt-1">{errors.psHours.message as string}</p>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Lecture Biblique (LB)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div>
                  <label className="block text-xs mb-1">Nombre de chapitres</label>
                  <div className="flex items-center">
                    <input 
                      type="number" 
                      className="input-field"
                      min="0"
                      {...register('chaptersCount', { 
                        required: 'Ce champ est requis',
                        min: { value: 0, message: 'La valeur doit être positive' }
                      })}
                    />
                    <span className="mx-2">/</span>
                    <input 
                      type="number" 
                      className="input-field"
                      min="0"
                      {...register('chaptersTarget', { 
                        required: 'Ce champ est requis',
                        min: { value: 0, message: 'La valeur doit être positive' }
                      })}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1">Liste des chapitres lus</label>
                <textarea 
                  className="input-field"
                  rows={2}
                  placeholder="Ex: Genèse 1-3, Psaumes 23"
                  {...register('chaptersList')}
                ></textarea>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Littérature Chrétienne (LC)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1">Nombre de pages</label>
                  <input 
                    type="number" 
                    className="input-field"
                    min="0"
                    {...register('pagesCount', { 
                      required: 'Ce champ est requis',
                      min: { value: 0, message: 'La valeur doit être positive' }
                    })}
                  />
                  {errors.pagesCount && (
                    <p className="text-red-500 text-xs mt-1">{errors.pagesCount.message as string}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs mb-1">Nom du livre</label>
                  <input 
                    type="text" 
                    className="input-field"
                    {...register('bookName', { required: 'Ce champ est requis' })}
                  />
                  {errors.bookName && (
                    <p className="text-red-500 text-xs mt-1">{errors.bookName.message as string}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button type="submit" className="btn-primary">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
