/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useForm } from 'react-hook-form';

const PrayerTimeForm: React.FC<{
  onSubmit: (data: any) => void;
  defaultValues?: any;
}> = ({ onSubmit, defaultValues = {} }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues
  });

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">Prière Seule (PS)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Temps de prière (heures)</label>
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
        <div>
          <label className="block text-sm font-medium mb-1">Notes (optionnel)</label>
          <textarea 
            className="input-field"
            rows={2}
            placeholder="Notes sur votre temps de prière"
            {...register('psNotes')}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default PrayerTimeForm;
