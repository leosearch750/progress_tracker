/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useForm } from 'react-hook-form';

const DailyEntryForm: React.FC<{
  onSubmit: (data: any) => void;
  defaultValues?: any;
}> = ({ onSubmit, defaultValues = {} }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
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
      
      <div className="flex justify-end">
        <button type="submit" className="btn-primary">
          Enregistrer
        </button>
      </div>
    </form>
  );
};

export default DailyEntryForm;
