import React from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../services/store';

const ImportunityList: React.FC = () => {
  const { importunities, loading } = useSelector((state: RootState) => state.importunities);

  if (loading) {
    return <div className="text-center py-4">Chargement...</div>;
  }

  if (importunities.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucune importunité trouvée</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {importunities.map((importunity) => (
        <div key={importunity.id} className="card p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{importunity.subject}</h3>
              <div className="mt-1 text-sm text-gray-500">
                {new Date(importunity.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Compteur: {importunity.counter}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-1 text-blue-600 hover:text-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-1 text-red-600 hover:text-red-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImportunityList;
