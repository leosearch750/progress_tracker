import React from 'react';
import Navbar from '../components/common/Navbar';
import ImportunityForm from '../components/importunity/ImportunityForm';
import ImportunityList from '../components/importunity/ImportunityList';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../services/store';
import { getAllImportunities } from '../services/slices/importunitySlice';
import { useEffect } from 'react';

const ImportunityPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllImportunities());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Importunités</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ImportunityForm />
          </div>
          
          <div className="lg:col-span-2">
            <div className="card p-4">
              <h2 className="text-xl font-semibold mb-4">Mes importunités</h2>
              <ImportunityList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportunityPage;
