import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { type RegisterCredentials } from '../../types/auth.types';
import { type RootState, type AppDispatch } from '../../services/store';
import { register as registerUser } from '../../services/slices/authSlice';

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterCredentials>();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  
  const password = watch('password');

  const onSubmit = (data: RegisterCredentials) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="card max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Inscription</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Nom d'utilisateur
          </label>
          <input
            id="username"
            type="text"
            className="input-field"
            {...register('username', { 
              required: 'Le nom d\'utilisateur est requis',
              minLength: { value: 3, message: 'Le nom d\'utilisateur doit contenir au moins 3 caractères' }
            })}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            className="input-field"
            {...register('password', { 
              required: 'Le mot de passe est requis',
              minLength: { value: 6, message: 'Le mot de passe doit contenir au moins 6 caractères' }
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
            Confirmer le mot de passe
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="input-field"
            {...register('confirmPassword', { 
              required: 'Veuillez confirmer votre mot de passe',
              validate: value => value === password || 'Les mots de passe ne correspondent pas'
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={loading}
        >
          {loading ? 'Inscription en cours...' : 'S\'inscrire'}
        </button>
      </form>
      
      <p className="text-center mt-4 text-sm">
        Déjà un compte ?{' '}
        <Link to="/login" className="text-primary hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
