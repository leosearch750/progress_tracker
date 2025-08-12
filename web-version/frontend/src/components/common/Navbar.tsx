import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../services/store';
import { logout } from '../../services/slices/authSlice';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-xl font-bold">ProgressTracker</Link>
          </div>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/dashboard" className="hover:text-gray-200">Tableau de bord</Link>
            <Link to="/entry" className="hover:text-gray-200">Saisie</Link>
            <Link to="/history" className="hover:text-gray-200">Historique</Link>
            <Link to="/importunity" className="hover:text-gray-200">Importunités</Link>
            <Link to="/goals" className="hover:text-gray-200">Objectifs</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline">{user?.username}</span>
            <button 
              onClick={handleLogout}
              className="bg-white text-primary px-3 py-1 rounded-md text-sm hover:bg-gray-100"
            >
              Déconnexion
            </button>
          </div>
          
          {/* Menu mobile */}
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Dropdown menu mobile (caché par défaut) */}
      <div className="hidden md:hidden bg-primary-dark">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col space-y-2">
            <Link to="/dashboard" className="py-2 hover:text-gray-200">Tableau de bord</Link>
            <Link to="/entry" className="py-2 hover:text-gray-200">Saisie</Link>
            <Link to="/history" className="py-2 hover:text-gray-200">Historique</Link>
            <Link to="/importunity" className="py-2 hover:text-gray-200">Importunités</Link>
            <Link to="/goals" className="py-2 hover:text-gray-200">Objectifs</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
