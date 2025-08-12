/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useForm } from 'react-hook-form';

const ChristianReadingForm: React.FC<{
  onSubmit: (data: any) => void;
  defaultValues?: any;
}> = ({ onSubmit, defaultValues = {} }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues
  });

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">Littérature Chrétienne (LC)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre de pages</label>
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
          <label className="block text-sm font-medium mb-1">Nom du livre</label>
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
  );
};

export default ChristianReadingForm;
