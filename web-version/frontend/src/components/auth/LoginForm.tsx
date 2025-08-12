import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { type AuthCredentials } from '../../types/auth.types';
import { type RootState, type AppDispatch } from '../../services/store';
import { login } from '../../services/slices/authSlice';

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<AuthCredentials>();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const onSubmit = (data: AuthCredentials) => {
    dispatch(login(data));
  };

  return (
    <div className="card max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
      
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
            {...register('username', { required: 'Le nom d\'utilisateur est requis' })}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            className="input-field"
            {...register('password', { required: 'Le mot de passe est requis' })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={loading}
        >
          {loading ? 'Connexion en cours...' : 'Se connecter'}
        </button>
      </form>
      
      <p className="text-center mt-4 text-sm">
        Pas encore de compte ?{' '}
        <Link to="/register" className="text-primary hover:underline">
          S'inscrire
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
