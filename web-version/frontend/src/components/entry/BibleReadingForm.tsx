/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useForm } from 'react-hook-form';

const BibleReadingForm: React.FC<{
  onSubmit: (data: any) => void;
  defaultValues?: any;
}> = ({ onSubmit, defaultValues = {} }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues
  });

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">Lecture Biblique (LB)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre de chapitres</label>
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
          {errors.chaptersCount && (
            <p className="text-red-500 text-xs mt-1">{errors.chaptersCount.message as string}</p>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Liste des chapitres lus</label>
        <textarea 
          className="input-field"
          rows={2}
          placeholder="Ex: Genèse 1-3, Psaumes 23"
          {...register('chaptersList')}
        ></textarea>
      </div>
    </div>
  );
};

export default BibleReadingForm;
