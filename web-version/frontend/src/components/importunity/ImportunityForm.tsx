/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createImportunity } from '../../services/slices/importunitySlice';
import { type AppDispatch } from '../../services/store';

const ImportunityForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data: any) => {
    dispatch(createImportunity({
      date: new Date(),
      subject: data.subject,
      counter: data.counter
    }));
    reset();
  };

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4">Nouvelle Importunité</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium mb-1">
            Sujet
          </label>
          <input
            id="subject"
            type="text"
            className="input-field"
            placeholder="Ex: Famille, Ministère, Santé..."
            {...register('subject', { required: 'Le sujet est requis' })}
          />
          {errors.subject && (
            <p className="text-red-500 text-xs mt-1">{errors.subject.message as string}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="counter" className="block text-sm font-medium mb-1">
            Compteur initial
          </label>
          <input
            id="counter"
            type="number"
            className="input-field"
            min="0"
            defaultValue={1}
            {...register('counter', { 
              required: 'Le compteur est requis',
              min: { value: 0, message: 'La valeur doit être positive' }
            })}
          />
          {errors.counter && (
            <p className="text-red-500 text-xs mt-1">{errors.counter.message as string}</p>
          )}
        </div>
        
        <div className="flex justify-end">
          <button type="submit" className="btn-primary">
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImportunityForm;
